const {run} = require('madrun');

export default {
    'build': () => 'tsup',
    'wisdom': () => run(['build', 'test', 'test:dts']),
};

const a = {
    'build': () => 'tsup',
    'wisdom': () => run('build1', 'test', 'test:dts'),
};

const c = {
    'build': () => 'tsup',
    'wisdom': () => run('build', '--test', 'test:dts'),
};
