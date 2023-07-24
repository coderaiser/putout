'use strict';

const a = () => {
    return path = path.at(-1) === '/' ? path : `${path}/`;
};

a();
