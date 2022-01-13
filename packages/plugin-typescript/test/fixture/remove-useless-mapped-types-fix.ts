type A = Readonly<Type>;

type X = {
    -readonly [Key in keyof Type]: Type[Key];
}

type Y = Partial<Type>;

type Z = Required<Type>;

const a: A = {};
const x: X = {};
const y: Y = {};
const z: Z = {};
