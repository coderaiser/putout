import test from 'supertape';
import {
    __filesystem,
    toJS,
    fromJS,
} from '@putout/operator-json';
import {
    parse,
    transform,
    findPlaces,
    print,
} from 'putout';
import {renameFiles} from './rename-files.js';

const {stringify} = JSON;

test('putout: operator: rename-files: report: no type in package.json', (t) => {
    const source = stringify([
        '/',
        [
            '/package.json',
            '{}',
        ],
        '/lib/',
        '/lib/index.cjs',
    ]);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        type: 'commonjs',
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    transform(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    const result = JSON.parse(fromJS(
        print(ast),
        __filesystem,
    ));
    
    const expected = [
        '/',
        [
            '/package.json',
            '{}',
        ],
        '/lib/',
        '/lib/index.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: rename-files: no type passed', (t) => {
    const typeHello = 'eyJ0eXBlIjogImhlbGxvIn0=';
    const source = stringify([
        '/',
        ['/package.json', typeHello],
        '/lib/',
        '/lib/index.cjs',
    ]);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    transform(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    const result = JSON.parse(fromJS(
        print(ast),
        __filesystem,
    ));
    
    const expected = [
        '/',
        ['/package.json', typeHello],
        '/lib/',
        '/lib/index.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: rename-files: report', (t) => {
    const typeHello = 'eyJ0eXBlIjogImhlbGxvIn0=';
    const source = stringify([
        '/',
        ['/package.json', typeHello],
        '/lib/',
        '/lib/index.cjs',
    ]);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    const [{message}] = findPlaces(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    const expected = `Rename '/lib/index.cjs' to '/lib/index.js'`;
    
    t.equal(message, expected);
    t.end();
});

test('putout: operator: rename-files: type mismatch', (t) => {
    const typeCommonJS = 'eyJ0eXBlIjogImhlbGxvIn0=';
    const source = stringify([
        '/',
        ['/package.json', typeCommonJS],
        '/lib/',
        '/lib/index.cjs',
    ]);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        type: 'module',
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    const places = findPlaces(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    t.notOk(places.length);
    t.end();
});

test('putout: operator: rename-files: no package content', (t) => {
    const source = stringify([
        '/',
        [
            '/package.json',
            '',
        ],
        '/lib/',
        '/lib/index.cjs',
    ]);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        type: 'module',
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    const places = findPlaces(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    t.notOk(places.length);
    t.end();
});

test('putout: operator: rename-files: no package.json: module', (t) => {
    const source = stringify(['/', '/lib/', '/lib/index.cjs']);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        type: 'module',
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    const places = findPlaces(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    t.notOk(places.length);
    t.end();
});

test('putout: operator: rename-files: no package.json: commonjs', (t) => {
    const source = stringify(['/', '/lib/', '/lib/index.cjs']);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const options = {
        type: 'commonjs',
        mask: '*.cjs',
        rename(name) {
            return name.replace(/cjs$/, 'js');
        },
    };
    
    transform(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles(options)],
        ],
    });
    
    const result = JSON.parse(fromJS(
        print(ast),
        __filesystem,
    ));
    
    const expected = [
        '/',
        '/lib/',
        '/lib/index.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: rename-files: no args', (t) => {
    const source = stringify(['/', '/lib/', '/lib/.madrun.js']);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    transform(ast, jsSource, {
        rules: {
            'rename-files': ['on', {
                from: '.madrun.js',
                to: 'madrun.js',
            }],
        },
        plugins: [
            ['rename-files', renameFiles()],
        ],
    });
    
    const result = JSON.parse(fromJS(
        print(ast),
        __filesystem,
    ));
    
    const expected = [
        '/',
        '/lib/',
        '/lib/madrun.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: rename-files: mask, from, to', (t) => {
    const source = stringify(['/', '/lib/', '/lib/madrun.spec.js']);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    transform(ast, jsSource, {
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles({
                mask: '*.spec.*',
                from: 'spec',
                to: 'test',
            })],
        ],
    });
    
    const result = JSON.parse(fromJS(
        print(ast),
        __filesystem,
    ));
    
    const expected = [
        '/',
        '/lib/',
        '/lib/madrun.test.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: operator: rename-files: mask, from, to: report', (t) => {
    const source = stringify(['/', '/lib/', '/lib/madrun.spec.js']);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const places = transform(ast, jsSource, {
        fix: false,
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles({
                mask: '*.spec.*',
                from: 'spec',
                to: 'test',
            })],
        ],
    });
    
    const expected = [{
        message: `Rename '*.spec.*' to '*.test.*'`,
        position: {
            column: 0,
            line: 0,
        },
        rule: 'rename-files',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: rename-files: mask, from, to: no report: no options', (t) => {
    const source = stringify(['/', '/lib/', '/lib/madrun.spec.js']);
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    const places = transform(ast, jsSource, {
        fix: false,
        rules: {
            'rename-files': 'on',
        },
        plugins: [
            ['rename-files', renameFiles()],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});
