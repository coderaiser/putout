'use strict';

const onlyDeclared = ({count}) => count === 1;

module.exports = (items) => items.filter(onlyDeclared);

