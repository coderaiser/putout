'use strict';

const onlyDeclared = ({count, called}) => count === 1 && !called;
const onlyCalled = ({count, called}) => !count && called;

const onlyDeclaredOrCalled = (a) => {
    return onlyDeclared(a) || onlyCalled(a);
};

module.exports = (items) => {
    return items
        .filter(onlyDeclaredOrCalled);
};

