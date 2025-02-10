'use strict';

const montag = require('montag');
const test = require('supertape');
const putout = require('..');
const {keys} = Object;
const {stringify} = JSON;
const {
    operator,
    parse,
    traverse,
} = putout;

test('putout: operator: compare', (t) => {
    const result = operator.compare('const a = {}', 'const __ = {}');
    
    t.ok(result, 'should equal');
    t.end();
});

test('putout: operator: compareAll', (t) => {
    const result = operator.compareAll('const a = {}', ['const __ = {}']);
    
    t.ok(result, 'should equal');
    t.end();
});

test('putout: operator: compare: any', (t) => {
    const result = operator.compareAny('const a = {}', ['const __ = {}', 'abc']);
    
    t.ok(result);
    t.end();
});

test('putout: operator: declare', (t) => {
    const declare = operator.declare({
        fs: `import fs from 'fs/promises'`,
    });
    
    const source = montag`
        await fs.readFile('./.putout.json', 'utf8');
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare', declare],
        ],
    });
    
    const expected = montag`
        import fs from 'fs/promises';
        
        await fs.readFile('./.putout.json', 'utf8');
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: addArgs', (t) => {
    const args = {
        compare: ['{compare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', () => {
            compare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['add-args', operator.addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({compare}) => {
            compare(a, b);
        });
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: toJS', (t) => {
    const source = stringify({
        hello: 'world',
    }) + '\n';
    
    const js = operator.toJS(source);
    const result = operator.fromJS(js);
    
    t.equal(result, source);
    t.end();
});

test('putout: operator: matchFiles', (t) => {
    const plugin = operator.matchFiles({
        hello: {
            replace: () => ({
                __a: '__b',
            }),
        },
    });
    
    const result = keys(plugin);
    const expected = [
        'fix',
        'scan',
        'report',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: renameFiles', (t) => {
    const {scan} = operator.renameFiles({
        type: 'module',
        mask: '*.mjs',
        rename(name) {
            return name.replace(/mjs$/, 'js');
        },
    });
    
    t.ok(scan);
    t.end();
});

test('putout: operator: isKeyword', (t) => {
    const result = operator.isKeyword('if');
    
    t.ok(result);
    t.end();
});

test('putout: operate: parens: hasParens', (t) => {
    let result = false;
    const source = '(b = 3)';
    const ast = parse(source);
    
    traverse(ast, {
        AssignmentExpression(path) {
            result = operator.hasParens(path);
            path.stop();
        },
    });
    
    t.ok(result);
    t.end();
});
