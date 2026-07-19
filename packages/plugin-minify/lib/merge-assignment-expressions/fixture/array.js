class X {
    constructor() {
        this.categories = [];
        this.links = [];
        
        this.links.push(1);
    }
    show() {
        console.log(this.links.length + this.categories.length);
    }
}

const a = new X();
a.show();

