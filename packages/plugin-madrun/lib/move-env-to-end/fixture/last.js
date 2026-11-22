export default {
    'test': () => ['tape', {
        a: 'b',
    }],
    'lint': () => 'putout .',
    'build': () => [],
    'fn': () => [{
        a: 'b',
    }],
    'both': () => [{
        a: 'b',
    }, {
        c: 'd',
    }],
};
