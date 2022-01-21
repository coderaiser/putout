'use strict';

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');

const {declare} = require('./declare.js');

test('putout: operator: declare: declare', (t) => {
    const declarations = {
        operator: `import {operator} from 'putout'`,
    };
    
    const {code} = putout('const {compare} = operator;', {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {operator} from 'putout';
        const {compare} = operator;
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: declare: spread', (t) => {
    const declarations = {
        maybeArray: `const maybeArray = (a) => isArray(a) ? a : [a]`,
    };
    
    const {code} = putout('const a = [...maybeArray(b)];', {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        const maybeArray = a => isArray(a) ? a : [a];
        const a = [...maybeArray(b)];
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: declare: variable', (t) => {
    const declarations = {
        operator: `import {operator} from 'putout'`,
        getTemplateValues: `const {getTemplateValues} = operator`,
    };
    
    const source = montag`
        module.exports.traverse = () => ({
            'const __a = __b': (path) => {
                const {__a} = getTemplateValues(path, 'const __a = __b');
            },
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {operator} from 'putout';
        
        const {
            getTemplateValues
        } = operator;
        
        module.exports.traverse = () => ({
            'const __a = __b': (path) => {
                const {__a} = getTemplateValues(path, 'const __a = __b');
            },
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: cache', (t) => {
    const declarations = {
        test: `import {test} from 'supertape'`,
        stub: `import {stub} from 'supertape'`,
    };
    
    const source = montag`
        test('', (t) => {
            const fn = stub();
            fn();
            t.end();
        });
    `;
    
    const {code: secondAttempt} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
            'merge-duplicate-imports',
        ],
    });
    
    const expected = montag`
        import {test, stub} from 'supertape';
        test('', (t) => {
            const fn = stub();
            fn();
            t.end();
        });
    `;
    
    t.equal(secondAttempt, expected);
    t.end();
});

test('putout: operator: declare: strict mode', (t) => {
    const declarations = {
        test: `import {test} from 'supertape'`,
        stub: `import {stub} from 'supertape'`,
    };
    
    const source = montag`
        'use strict';
        
        test('', (t) => {
            const fn = stub();
            fn();
            t.end();
        });
    `;
    
    const {code: secondAttempt} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
            'merge-duplicate-imports',
        ],
    });
    
    const expected = montag`
        'use strict';
        import {test, stub} from 'supertape';
        
        test('', (t) => {
            const fn = stub();
            fn();
            t.end();
        });
    `;
    
    t.equal(secondAttempt, expected);
    t.end();
});

test('putout: operator: declare: VariableDeclaration', (t) => {
    const declarations = {
        mockImport: `const {mockImport} = createMockImport(import.meta.url)`,
        reImport: `const {reImport} = createMockImport(import.meta.url)`,
        stopAll: `const {stopAll} = createMockImport(import.meta.url)`,
        createMockImport: `import {createMockImport} from 'mock-import';`,
    };
    
    const source = montag`
        await reImport('hello');
        await reImport('world');
        
        mockImport('a', b);
        stopAll();
    `;
    
    const {code: secondAttempt} = putout(source, {
        plugins: [
            ['declare', declare(declarations)],
        ],
    });
    
    const expected = montag`
            import {createMockImport} from 'mock-import';
            
            const {
              stopAll
            } = createMockImport(import.meta.url);
            
            const {
              mockImport
            } = createMockImport(import.meta.url);
            
            const {
              reImport
            } = createMockImport(import.meta.url);
            
            await reImport('hello');
            await reImport('world');
            
            mockImport('a', b);
            stopAll();
    `;
    
    t.equal(secondAttempt, expected);
    t.end();
});

test('putout: operator: declare: ImportDeclaration', (t) => {
    const declarations = {
        assign: `const {assign} = Object`,
    };
    
    const source = montag`
        import a1 from 'b';
        const a = require('x');
        
        function hello() {
            assign('xxx');
        }
    `;
    
    const {code: secondAttempt} = putout(source, {
        plugins: [
            ['declare', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import a1 from 'b';
        
        const {
            assign
        } = Object;
        
        const a = require('x');
        
        function hello() {
            assign('xxx');
        }
`;
    
    t.equal(secondAttempt, expected);
    t.end();
});

test('putout: operator: declare: dismiss', (t) => {
    const declarations = {
        assign: `const {assign} = Object`,
    };
    
    const source = montag`
        import a1 from 'b';
        const a = require('x');
        
        function hello() {
            assign('xxx');
        }
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                dismiss: [
                    'assign',
                ],
            }],
        },
        plugins: [
            ['declare', declare(declarations)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: declare: options', (t) => {
    const declarations = {
        assign: `const {assign} = Object`,
    };
    
    const source = montag`
        import a1 from 'b';
        const a = require('x');
        
        function hello() {
            assign('xxx');
        }
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        import a1 from 'b';
        
        const {
            assign
        } = Object;
        
        const a = require('x');
        
        function hello() {
            assign('xxx');
        }
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: vars', (t) => {
    const declarations = {
        maybeArray: `const maybeArray = (a) => isArray(a) ? a : [a]`,
        maybeFn: `const maybeFn = (a) => isFn(a) ? a : noop`,
    };
    
    const source = montag`
        const b = [
            ...maybeArray(a),
            maybeFn(b),
        ];
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        const maybeFn = a => isFn(a) ? a : noop;
        const maybeArray = a => isArray(a) ? a : [a];
        const b = [
            ...maybeArray(a),
            maybeFn(b),
        ];
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: dual: commonjs', (t) => {
    const declarations = {
        simport: {
            esm: 'const simport = createSimport(import.meta.url)',
            commonjs: 'const simport = createSimport(__filename)',
        },
    };
    
    const source = montag`
        simport('fs');
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        const simport = createSimport(__filename);
        simport('fs');
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: esm for commonjs', (t) => {
    const declarations = {
        simport: {
            esm: 'const simport = createSimport(import.meta.url)',
        },
    };
    
    const source = montag`
        simport('fs');
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        simport('fs');
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: esm for esm', (t) => {
    const declarations = {
        simport: {
            esm: 'const simport = createSimport(import.meta.url)',
        },
    };
    
    const source = montag`
        export const hi = 'world';
        simport('fs');
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        const simport = createSimport(import.meta.url);
        export const hi = 'world';
        simport('fs');
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: dual: esm', (t) => {
    const declarations = {
        simport: {
            esm: 'const simport = createSimport(import.meta.url)',
            commonjs: 'const simport = createSimport(__filename)',
        },
    };
    
    const source = montag`
        import {readFile} from 'fs';
        simport('fs');
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        import {readFile} from 'fs';
        const simport = createSimport(import.meta.url);
        simport('fs');
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: MemberExpression', (t) => {
    const declarations = {
        __c4: 'const {__c4} = global',
    };
    
    const source = montag`
        __c4.mark();
    `;
    
    const {code} = putout(source, {
        rules: {
            declare: ['on', {
                declarations,
            }],
        },
        plugins: [
            ['declare', declare({})],
        ],
    });
    
    const expected = montag`
        const {
          __c4
        } = global;
        
        __c4.mark();
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: imports order', (t) => {
    const declarations = {
        operator: `import {operator} from 'putout'`,
        readFile: `import {readFile} from 'fs/promises'`,
    };
    
    const source = montag`
        readFile();
        operator();
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {readFile} from 'fs/promises';
        import {operator} from 'putout';
        readFile();
        operator();
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: vars order', (t) => {
    const declarations = {
        not: `const not = (fn) => (...a) => !fn(...a);`,
        id: `const id = () => a;`,
    };
    
    const source = montag`
        const notOK = not(isOK);
        const a = id('hello');
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        const id = () => a;
        const not = fn => (...a) => !fn(...a);
        const notOK = not(isOK);
        const a = id('hello');
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: require', (t) => {
    const declarations = {
        process: `const process = require('process')`,
        fs: `const fs = require('fs')`,
    };
    
    const source = montag`
        const a = 5;
        
        async function hello() {
            await fs.readFile(a);
            return process.cwd();
        }
    `;
    
    const {code: secondAttempt} = putout(source, {
        plugins: [
            ['declare', declare(declarations)],
        ],
    });
    
    const expected = montag`
        const process = require('process');
        const fs = require('fs');
        const a = 5;
        
        async function hello() {
            await fs.readFile(a);
            return process.cwd();
        }
    `;
    
    t.equal(secondAttempt, expected);
    t.end();
});

test('putout: operator: declare: local import', (t) => {
    const declarations = {
        operator: `import {operator} from 'putout'`,
    };
    
    const source = montag`
        import a from './a.js';
        operator();
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {operator} from 'putout';
        import a from './a.js';
        operator();
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: couple imports', (t) => {
    const declarations1 = {
        operator: `import {operator} from 'putout'`,
    };
    
    const declarations2 = {
        compare: `import {compare} from '@putout/compare'`,
    };
    
    const source = montag`
        import a from 'a';
        
        operator();
        compare();
    `;
    
    let {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations1)],
        ],
    });
    
    ({code} = putout(code, {
        plugins: [
            ['declare-undefined-variables', declare(declarations2)],
        ],
    }));
    
    const expected = montag`
        import a from 'a';
        
        import {operator} from 'putout';
        
        import {compare} from '@putout/compare';
        
        operator();
        compare();
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: declare: couple consts', (t) => {
    const declarations1 = {
        maybeArray: 'const maybeArray = (a) => isArray(a) ? a : [a]',
        isArray: 'const {isArray} = Array',
    };
    
    const source = montag`
        maybeArray(x);
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations1)],
        ],
    });
    
    const expected = montag`
        const {
          isArray
        } = Array;
        
        const maybeArray = a => isArray(a) ? a : [a];
        maybeArray(x);
    `;
    
    t.equal(code, expected);
    t.end();
});
