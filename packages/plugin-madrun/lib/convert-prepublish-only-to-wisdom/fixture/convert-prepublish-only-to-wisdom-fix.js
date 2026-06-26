export default {
    'wisdom': () => run(['lint', 'coverage']),
};

const a = {
    'wisdom': run('test'),
};

const b = {
    'x': () => run(['lint', 'coverage']),
    'wisdom': run('test'),
};
