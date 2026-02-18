const maybeArray = (a) => isArray(a) ? a : [a];
const maybeArrayFrom = (a) => isSet(a) ? Array.from(a) : maybeArray(a);
const b = maybeArrayFrom(a);
