const getType = (a) => (a.node || a).type;

export const isDisjunction = (a) => getType(a) === 'Disjunction';
export const isCharacterClass = (a) => getType(a) === 'CharacterClass';
export const isParentDisjunction = ({parentPath}) => parentPath?.parent?.type === 'Disjunction';
export const isChar = (a) => getType(a) === 'Char';
export const isAlternative = (a) => getType(a) === 'Alternative';
