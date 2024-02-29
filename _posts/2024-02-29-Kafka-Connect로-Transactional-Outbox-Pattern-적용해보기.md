---
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
---

[분산 시스템에서 메시지 안전하게 다루기](https://blog.gangnamunni.com/post/transactional-outbox/)

처음 `Kafka Connect`를 도입하게 된 것은 위의 글을 읽고 나서이다. 위 글을 요약하자면 데이터베이스 트랜잭션에 이벤트 발행 작업이 포함되어 있을 경우 **발행되지 말아야 할 이벤트가 발행될 수 있는 문제**가 생길 수 있다는 것이다. 

어떻게 데이터베이스 트랜잭션과 이벤트 발행 작업이 하나의 원자적 트랜잭션 처럼 실행되게 할 수 있을까?

## Transactional Outbox Pattern

![[https://microservices.io/patterns/data/transactional-outbox.html](https://microservices.io/patterns/data/transactional-outbox.html)](../assets/T-O-B.png)

[Transactional outbox pattern](https://microservices.io/patterns/data/transactional-outbox.html)이란 이벤트 발행 작업을 바로 이벤트 시스템에 발행하는 것이 아니라, 먼저 데이터베이스의 특정 테이블(`Outbox`)에 그 작업이 포함된 정보를 저장하는 것이다. 그러면 모든 작업을 **하나의** **데이터베이스 트랜잭션**으로 처리할 수 있게 된다.

그러고나서 이 테이블에 저장된 레코드를 읽어가는 컴포넌트를 만들어서 계속 읽어가게끔한다. 여기서 이 컴포넌트를 대체하는 역할을 하는 것이 `Kafka Connect`이다.

`Kafka Connect`에는 다음과 같은 개념들이 존재한다.

- [Connectors](https://docs.confluent.io/platform/current/connect/index.html#connect-connectors): The high level abstraction that coordinates data streaming by managing tasks
- [Tasks](https://docs.confluent.io/platform/current/connect/index.html#connect-tasks): The implementation of how data is copied to or from Kafka
- [Workers](https://docs.confluent.io/platform/current/connect/index.html#connect-workers): The running processes that execute connectors and tasks
- [Converters](https://docs.confluent.io/platform/current/connect/index.html#connect-converters): The code used to translate data between Connect and the system sending or receiving data
- [Transforms](https://docs.confluent.io/platform/current/connect/index.html#connect-transforms): Simple logic to alter each message produced by or sent to a connector
- [Dead Letter Queue](https://docs.confluent.io/platform/current/connect/index.html#dead-letter-queues): How Connect handles connector errors

`Connect`만 존재해서는 되는 것이 아니고 데이터 스트리밍 작업을 관리하는 `Connector`가 실행되어야 하고 그 안에서 실제 작업을 수행하는 `Task`라는 것이 실행되어야 한다. 이 글에서는 `Transactional Outbox Pattern`의 목적에 맞는 `Source Connector`, 그 중에서도 `MySQL`을 쓸 때 사용할 수 있는 `Debezium MySQL Source Connector`를 기준으로 이를 적용하는 과정에서 겪었던 어려움을 하나씩 설명해보겠다.

### MySQL 설정

- [binlog](https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-binlog)
    
    `MySQL`은 데이터베이스에 커밋되는 모든 작업을 기록하는 `binlog`라는 것을 가지고 있는데 `connector`는 이를 읽어서 데이터베이스 변경을 감지하고 카프카에 이벤트를 발행한다. 일단 당연하게도 이 `binlog` 설정은 활성화 되어 있어야 하며 `format`은 `ROW` 이어야 한다. 또한 `binlog_expire_logs_seconds` 을 넉넉하게 설정해주어야 한다. `MySQL`을 `Amazon RDS`에서 사용하였는데 이럴 경우 `binlog` 설정을 따로 해주어야 해서 (문서에 다나와있는데 이 부분을 놓쳤다…ㅜㅜ) 이걸 모르고 한동안 사용하며 `binlog`가 ASAP으로 사라지는 상황에서 테스트를 했었는데 `connector`가 찾는 `binlog`가 사라졌다는 에러를 엄청 맞았었다. 두 가지 상황을 정리할 수 있는데
    
    1. 부하 테스트 시 `binlog`가 급격하게 많이 쓰이면서 예전 것이 빠르게 사라진다.
    2. 오랫동안 테스트하지 않으면서 예전 `binlog`가 자연스럽게 사라진다.
    
    `connector`는 실행되면서 자신이 알고 있는 `binlog` 위치를 계속 갱신하는데 1번의 경우 그 타이밍을 놓치거나 2번의 경우에는 들어오는 변경이 없을 경우에는 위치 갱신을 멈추기 때문에 binlog 위치를 따라가는 것을 놓치게 되어 버그가 생겼다. 그래서 충분히 `binlog_expire_logs_seconds` 값을 주는 것이 중요하다. (최대 30일)
    
- `privileges`
    
    `MySQL`의 `binlog`를 읽어가기 위해서는 `connector`가 사용하는 `db` 계정에 몇 가지 권한이 필요해서 이를 설정해 주어야 한다.
    
    ```sql
    GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'user' IDENTIFIED BY 'password';
    ```
    

### Kafka Connect & Debezium MySQL Source Connector Configuration

- [snapshot](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-snapshot-mode)
    
    이 부분이 아직도 많이 헷갈리는데 내가 이해한 부분만 정리해서 설명하자면 카프카는 스냅샷을 통해 현재 데이터베이스의 상태를 카프카에 복제하고(이벤트 발행) `binlog`의 위치를 스냅샷하여 이를 기반으로한 오프셋을 통해 `binlog`의 변경을 읽어간다. 또 이 `binlog`의 위치는 커넥터가 실행되면서 주기적으로 최신으로 갱신된다.
    
    `connector`가 설정할 수 있는 `snapshot.mode`는 6가지가 있고 3가지 정도만 살펴보면,
    
    `when_needed`를 사용해서 데이터 베이스 전체의 스냅샷을 찍고 스냅샷이 더 이상 존재 하지 않을경우 알아서 다시 스냅샷을 찍도록 하였었는데 이 경우에는 이미 읽었던 값들까지 처음부터 다시 읽어오기 때문에 부하가 상당히 많이 걸렸다. 
    
    `schema_only`를 사용하면 데이터베이스 스키마만 스냅샷을 찍고 데이터는 찍지 않는다(그러면 이렇게 띄운 커넥터는 기존의 데이터베이스 레코드들을 읽어가지 않는 건가??). 다시 `snapshot`을 찍는 것은 부담되고 굳이 데이터베이스 값 까지 찍을 필요가 없는 것 같아서 `schema_only`를 사용하였다.
    
    `never`의 경우는 스냅샷을 아예 찍지 않고 시작할 때 현재 `binlog`의 처음부터 읽어간다.
    

### Transforms

- `Custom transformations`
    
    `Outbox`테이블에서 데이터를 읽어가면 카프카 토픽에 메시지를 발행해야하는데 이 때 토픽을 내가 원하는 대로 지정하고 싶었다. 이 과정에서 `Single Message Transform(SMT)`이라는 이미 만들어진 토픽 변환 플러그인들이 여러개 있었지만 완전히 커스텀하려면 직접 구현을 해야했고 마침 자바를 사용해서 작업을 해보고 싶었던 찰나에 이 플러그인의  커스텀한 구현도 자바로 해야해서 잘되었다 생각하고 직접 해봤다.
    
    구현해야하는 `interface`는 다음과 같았고 `config()`에 원하는 설정 값을 지정할 수 있고 `apply()`에서 읽은 테이블의 값이 어느 토픽, 어느 파티션으로 갈지 구현할 수 있었다.
    
    ```java
    public interface Transformation<R extends ConnectRecord<R>> extends Configurable, Closeable {
        R apply(R var1);
    
        ConfigDef config();
    
        void close();
    }
    ```
    
    구현을 다 하고 나면 `jar`로 빌드하여 `kafka connect`가 사용할 `plugin`이 모여있는 파일 경로가 지정되어 있는데 거기에 같이 넣어주면 직접 커스텀한 `SMT`를 적용할 수 있었다.
    

### JVM Memory Issue

이 부분에서 가장 고생을 하였는데 `Kafka Connect` 운영은 `Kubernetes`에 `Deployment`를 생성해서 `Pod`위에서 하고 있었다. 그런데 부하 테스트를 할 때마다 계~속 `OOMKilled`로 `Pod`가 재시작했다. 이것때문에 메모리를 분석하려고 `Prometheus`, `Grafana`도 배워서 모니터링해보고, 힙 덥프를 떠서 `Eclipse MAT`로 분석도 해보고 했지만 별다른 성과가 없었다.

일단 모니터링했던 현상은 `Kafka Connect`의 프로세스의 메모리가 부하 테스트를 하면 할수록 일정하게 누적되다가 `Pod`의 `limit memory`인 `2Gi` 도달 할 때쯤 `OOMKilled`가 발생하는 것이었다. 그러다가 문득 의심이 들었던 건 모니터링 화면에서 `Java Heap` 메모리가 최대 값이 `2Gi`로 잡혀있는 것이었다. 나는 따로 설정한 적이 없는데 왜 `2Gi`로 잡혀있지?? 또, `Pod`의 `limit memory` 설정 값이 `2Gi`인데 `Heap Memory`가 최대 값을 `2Gi`로 잡아놨으면 처음부터 안떴어야 하는거 아닌가?? 라는 생각들이 들게되었고 이 쪽을 분석하는 것으로 방향을 잡고 하나하나씩 찾아갔다.

첫 번째로 발견한 것은 `Pod`에서 사용하던 `confluent`의 `kafka connect` 도커 이미지의 실행 커맨드에 `-Xmx` `2Gi`가 있어서 `Heap Memory`가 `2Gi`가 잡혀있었던 것

`2Gi`로 `Heap` 최대 메모리를 잡는다고 처음부터 그 양을 할당받고 들어가는 것은 아니라는 것

보통 `JVM Application`을 `Kubernetes`위에서 운영할 때 `non-heap`, `system` 메모리 등을 위해서 `Heap` 최대 메모리는 `Pod limit`의 70%정도로 할당해서 운영한다는 것

마지막으로 `Pod`에는 `QoS`라는 것이있고 `Guaranteed class`(`resource`의 `request`와 `limit` 값을 완전히 일치)를 사용해야 `OOM`을 최대한 피할 수 있다는 것이었다.

그래서 이를 기반으로 `Pod`의 `resource` 값을 설정하고 `Kafka Connect` 실행 커맨드의 `-Xmx`를 조절했다. 이렇게 했더니 더 이상 부하테스트를 아무리해도 파드가 죽지 않았고 `Process`의 메모리가 안정적으로 유지되어서 `OOM` 때문에 고생했던 약 한달 간의 노력을 무사히 끝맺을 수 있었다
