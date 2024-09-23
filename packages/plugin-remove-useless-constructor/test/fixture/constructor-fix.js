class A {
    constructor() {}
}

class A1 extends B() {}
class A2 extends B() {}
class A3 extends B() {
    constructor(...args) {
        super(...args);
        this.x = 3;
    }
}

class A4 extends B() {
    constructor(...args) {
        this.x = 3;
    }
}
