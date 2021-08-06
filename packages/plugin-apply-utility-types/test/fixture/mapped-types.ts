type SuperType1 = {
    [Key in keyof Type]?: Type[Key];
}

type SuperType2 = {
    [Key in keyof Type]-?: Type[Key];
}

type SuperType3 = {
    readonly [Key in keyof Type]: Type[Key];
}
