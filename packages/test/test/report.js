'use strict';

const test = require('..')(__dirname, {
    'remove-imports': {
        report: () => 'avoid imports',
        match: ({options}) => ({
            'import __imports from "__a"'({__a}) {
                const {cache} = options;
                const {value} = __a;
                
                return cache.has(value);
            },
        }),
        replace: () => ({
            'import __imports from "__a"': '',
        }),
    },
});

test('putout: test: reportWithOptions', (t) => {
    const cache = new Map();
    cache.set('x', 'y');
    
    t.reportWithOptions('remove-import', 'avoid imports', {
        cache,
    });
    t.end();
});

test('putout: test: noReportWithOptions', (t) => {
    const cache = new Map();
    
    t.noReportWithOptions('remove-import', {
        cache,
    });
    t.end();
});

