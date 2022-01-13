type SuperType = {
    [Key in keyof Type]: Type[Key];
}

type A = {
    readonly [Key in keyof Type]: Type[Key];
}

type X = {
    -readonly [Key in keyof Type]: Type[Key];
}

type Y = {
    [Key in keyof Type]+?: Type[Key];
}

type Z = {
    [Key in keyof Type]-?: Type[Key];
}

const a: A = {};
const x: X = {};
const y: Y = {};
const z: Z = {};
