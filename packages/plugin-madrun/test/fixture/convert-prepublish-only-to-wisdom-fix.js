const {run} = require('madrun');

export default {
    'wisdom': () => run(['lint', 'coverage']),
};

const a = {
    'wisdom': await run('test'),
};

const b = {
    'x': () => run(['lint', 'coverage']),
    'wisdom': await run('test'),
};
