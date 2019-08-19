const Hello = class {
    user = 'username'
    #hello = 'hello'
    #world = 'world'
    
    render() {
        console.log(this.#hello, this.user);
    }
}
