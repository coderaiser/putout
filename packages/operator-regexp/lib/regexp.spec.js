'use strict';

const tryCatch = require('try-catch');
const {test} = require('supertape');
const {
    isSimpleRegExp,
    transformRegExp,
} = require('./regexp.js');

test('putout: operator: regexp: is-simple-regexp', (t) => {
    const result = isSimpleRegExp(/hello world/);
    
    t.ok(result);
    t.end();
});

test('putout: operator: regexp: transformRegExp', (t) => {
    const [, places] = transformRegExp('/[abb]/', {
        report: () => `Remove duplicates`,
        fix: (path) => {
            delete path.node.expressions[0];
        },
        traverse: ({push}) => ({
            CharacterClass(path) {
                const {expressions} = path.node;
                
                for (const [i, a] of expressions.entries()) {
                    for (const [j, b] of expressions.entries()) {
                        if (i === j)
                            continue;
                        
                        if (!a || !b)
                            continue;
                        
                        if (a.value === b.value)
                            push(path);
                    }
                }
            },
        }),
    });
    
    const expected = [{
        message: 'Remove duplicates',
        position: {
            column: 1,
            line: 1,
            offset: 1,
        },
    }, {
        message: 'Remove duplicates',
        position: {
            column: 1,
            line: 1,
            offset: 1,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: regexp: transformRegExp: no regexp', (t) => {
    const [error] = tryCatch(transformRegExp, '/[abb]/');
    
    t.equal(error.message, '☝️ Looks like RegExpTransformer is missing');
    t.end();
});
