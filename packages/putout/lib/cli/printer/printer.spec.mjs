import {test} from 'supertape';
import {configurePrinter} from './printer.mjs';

test('putout: cli: printer: recast', (t) => {
    const result = configurePrinter('1.js', 'recast');
    const expected = 'recast';
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: printer: md{json}', (t) => {
    const result = configurePrinter('hello.md{json}');
    const expected = ['putout', {
        format: {
            endOfFile: '',
            quote: '"',
        },
        semantics: {
            trailingComma: false,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: printer: json', (t) => {
    const result = configurePrinter('hello.json');
    const expected = ['putout', {
        format: {
            quote: '"',
        },
        semantics: {
            trailingComma: false,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: printer: md{js}', (t) => {
    const result = configurePrinter('hello.md{js}', 'putout');
    
    const expected = ['putout', {
        format: {
            endOfFile: '',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: printer: printer: md{ts}', (t) => {
    const result = configurePrinter('hello.md{ts}', ['putout', {}]);
    
    const expected = ['putout', {
        format: {
            endOfFile: '',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: printer: printer: overrides', (t) => {
    const result = configurePrinter('hello.yml{json}', ['putout', {
        format: {
            endOfFile: 'xx',
        },
    }]);
    
    const expected = ['putout', {
        format: {
            endOfFile: 'xx',
            quote: '"',
        },
        semantics: {
            trailingComma: false,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
