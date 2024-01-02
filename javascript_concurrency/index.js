function delay() {
    console.log("Delaying...");
    return new Promise(resolve => setTimeout(() => {
        resolve("ok")
    }, 1000));
}

class SingletonContainer {
    state = 0;

    async increment() {
        console.log(`Incrementing state... ${this.state}`);
        this.state++;
        // delay(1000).then(() => {
        //     console.log(`State incremented... ${this.state}`);
        // })
        // await delay(1000);
        console.log(`State incremented... ${this.state}`);

    }
}

function main() {
    const container = new SingletonContainer();
    container.increment();
    container.increment();
    container.increment();
    container.increment();
}

main()
