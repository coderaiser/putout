'use strict';

const hello = 'world';
hello;

const log = ({a}) => a;
for (const [a, b] of hello) {
    log({a});
}

