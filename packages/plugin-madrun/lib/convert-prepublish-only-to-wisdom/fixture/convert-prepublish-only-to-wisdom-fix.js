export default {
    'wisdom': () => run(['lint', 'test']),
};

const a = {
    'wisdom': run('test'),
};

const b = {
    'x': () => run(['lint', 'test']),
    'wisdom': run('test'),
};
