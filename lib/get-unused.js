'use strict';

const onlyDeclared = ({declared, used}) => declared && !used;

module.exports = (items) => {
    return items
        .filter(onlyDeclared);
};

