import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Introduction Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">👋 안녕하세요, 김보성입니다</h1>
        <p className="text-lg mb-4">
          AI 기반 Agent 시스템과 인프라에 관심 있는{" "}
          <strong>Kotlin 서버 개발자</strong>입니다.
        </p>
        <p className="text-lg">
          기능 중심이 아닌 <strong>시스템 흐름과 구조에 집중하는 설계자</strong>
          로서, 확장성과 재사용성을 고민하는 백엔드 시스템을 만들고 있습니다.
        </p>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="section-title">🚀 주요 프로젝트 요약</h2>

        <div className="space-y-8">
          <div className="project-card">
            <h3 className="text-xl font-semibold mb-3">
              🧠 Content Scoring 시스템
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>삼성 글로벌 마켓을 위한 콘텐츠 품질 자동화 시스템 개발</li>
              <li>Prompt 기반 로직 + XPath 기반 이미지 판단 기준 자동화</li>
              <li>과거 데이터 5만 건 마이그레이션 수행</li>
            </ul>
          </div>

          <div className="project-card">
            <h3 className="text-xl font-semibold mb-3">
              ⚙️ AI Task 오케스트레이션 시스템
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Kafka 기반 Orchestrator ↔ Worker 메시징 구조 설계 및 구현
              </li>
              <li>모듈 실행 결과 리포트, 로깅, 슬랙 알림 연동 포함</li>
              <li>Grafana 및 Retool을 활용한 UI 구성 및 모니터링 처리</li>
            </ul>
          </div>

          <div className="project-card">
            <h3 className="text-xl font-semibold mb-3">
              🚫 Black Seller 탐지 및 대응 시스템
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                개인정보·저작권 위반 여부 판단을 위한 모듈 및 워크플로우 구축
              </li>
              <li>LLM 로직 및 스크린샷 이미지 비교 기반 판단</li>
              <li>후보 추출 → 판단 → 대응 알림까지 전 과정을 자동화</li>
            </ul>
          </div>

          <div className="project-card">
            <h3 className="text-xl font-semibold mb-3">
              🛠️ Admin 백오피스 시스템 구축
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>계정/권한/회사/데이터 그룹 관리 기능 전체 구현</li>
              <li>
                FastAPI 기반 API, 이메일 알림 시스템, 환경별 배포 분리 구성
              </li>
              <li>사내 운영툴에서 활용되는 관리 기능을 통합 설계</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Tech Stack Section */}
      <section className="mb-16">
        <h2 className="section-title">🧑‍💻 기술 스택</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Backend</h3>
            <div className="flex flex-wrap">
              <span className="tech-stack">Kotlin</span>
              <span className="tech-stack">Spring Boot</span>
              <span className="tech-stack">FastAPI</span>
              <span className="tech-stack">Node.js</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Infra</h3>
            <div className="flex flex-wrap">
              <span className="tech-stack">AWS</span>
              <span className="tech-stack">Terraform</span>
              <span className="tech-stack">Kafka</span>
              <span className="tech-stack">PostgreSQL</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">DevOps</h3>
            <div className="flex flex-wrap">
              <span className="tech-stack">GitHub Actions</span>
              <span className="tech-stack">Grafana</span>
              <span className="tech-stack">Loki</span>
              <span className="tech-stack">Tempo</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">AI 연동</h3>
            <div className="flex flex-wrap">
              <span className="tech-stack">LLM Prompt 기반 판단 모듈</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* Contact Section */}
      <section className="mb-16">
        <h2 className="section-title">📫 연락처</h2>
        <div className="space-y-4">
          <p className="flex items-center">
            <span className="mr-2">📧</span>
            <a
              href="mailto:bosung@enhans.ai"
              className="text-blue-600 hover:underline"
            >
              gunbos1031@gmail.com
            </a>
          </p>
          <p className="flex items-center">
            <span className="mr-2">💼</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </p>
          <p className="flex items-center">
            <span className="mr-2">🧑‍💻</span>
            <a
              href="https://github.com/gunb0s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-700">
        더 나은 시스템을 만들기 위한 고민과, 깊이 있는 협업을 중요하게
        생각합니다.
        <br />
        오늘보다 나은 개발자로 성장하고자 항상 배우고 도전합니다.
      </blockquote>
    </main>
  );
}
