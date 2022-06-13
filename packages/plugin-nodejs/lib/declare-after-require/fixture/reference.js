const getRule = (a) => ({
    [a]: require(`./${a}`),
});

const getWrapRule = (a) => ({
    [a]: wrap(require(`./${a}`)),
});

const {} = global;
const {hello} = world;

module.exports.rules = {
    ...getWrapRule('nonblock-statement-body-newline'),
    ...getRule('putout'),
};

const config = require('@putout/eslint-config');
