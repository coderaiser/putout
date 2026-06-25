const {run} = require('madrun');

export default {
    'wisdom': () => run(['lint', 'test']),
};

const a = {
    'wisdom': await run('test'),
};

const b = {
    'x': () => run(['lint', 'test']),
    'wisdom': await run('test'),
};
