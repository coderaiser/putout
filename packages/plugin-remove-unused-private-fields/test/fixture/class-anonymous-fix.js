const Hello = class  {
    user = 'username';
    #hello = 'hello';
    render() {
        console.log(this.#hello, this.user);
    }
};
