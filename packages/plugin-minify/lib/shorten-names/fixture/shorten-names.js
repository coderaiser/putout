const a = (b) => {
    Object.keys(b);
}

const b = (keys) => {
    Object.keys(keys);
}

Object.freeze(a);
Object.defineProperty(b);
