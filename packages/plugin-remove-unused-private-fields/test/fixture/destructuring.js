class Foo {
  #x = 0;

  equals(obj) {
    const self = this;
    
    const {#x: x} = this;
    return x === obj.#x;
  }
}
