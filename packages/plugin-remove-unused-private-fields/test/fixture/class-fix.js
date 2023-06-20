class Hello {
    user = 'username';
    #hello = 'hello';
    render() {
        console.log(this.#hello, this.user);
    }
}
