type SuperType = {
    readonly [Key in keyof Type]?: Type[Key];
};
