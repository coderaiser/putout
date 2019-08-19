const t = class Hello {
    user = 'username'
    #hello = 'hello'
    #world = 'world'

    render() {
        console.log(this.#hello, this.user);
    }
}
