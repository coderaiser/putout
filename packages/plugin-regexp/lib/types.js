'use strict';

const getType = (a) => (a.node || a).type;

module.exports.isDisjunction = (a) => getType(a) === 'Disjunction';
module.exports.isParentDisjunction = ({parentPath}) => parentPath?.parent?.type === 'Disjunction';
module.exports.isChar = (a) => getType(a) === 'Char';
module.exports.isAlternative = (a) => getType(a) === 'Alternative';
