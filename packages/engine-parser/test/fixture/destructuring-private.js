class Foo {
  #x = 0;

  equals(obj) {
    const {#x: x} = this;
    return x === obj.#x
  }
}

