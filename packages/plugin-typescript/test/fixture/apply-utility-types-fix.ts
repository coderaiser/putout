type SuperType1 = Partial<Type>;

type SuperType2 = Required<Type>;

type SuperType3 = Readonly<Type>;

const a: SuperType1 = {};
const b: SuperType2 = {};
const c: SuperType3 = {};
