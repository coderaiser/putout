'use strict';

const ts = 'ts-node/register';

module.exports.checkTypes = () => {
    require(ts);
};

module.exports.transpile = () => {
    require(`${ts}/transpile-only`);
};

