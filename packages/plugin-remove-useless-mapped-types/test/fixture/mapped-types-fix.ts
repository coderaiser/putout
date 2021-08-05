type SuperType = Type;

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
