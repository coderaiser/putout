class A {
	constructor() { }
}

class A1 extends B() {
	constructor() {
		super();
	}
}

class A2 extends B() {
	constructor(...args) {
		super(...args);
	}
}

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
