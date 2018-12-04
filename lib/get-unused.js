'use strict';

const onlyDeclared = ({count, called}) => count === 1 || called;

module.exports = (items) => {
    return items
        .filter(onlyDeclared);
};

