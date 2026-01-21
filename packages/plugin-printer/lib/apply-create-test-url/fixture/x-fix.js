import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse, transform} from 'putout';
import montag from 'montag';
import {types} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {fixture, test} = createTest(__dirname);
const noop = () => {};
const {objectExpression} = types;

test('printer: tokenizer: object-expression', (t) => {
    t.print(fixture.objectExpression);
    t.end();
});

test('printer: tokenizer: object-expression: call', (t) => {
    t.print(fixture.objectExpressionCall);
    t.end();
});

test('printer: tokenizer: object-expression: comment: inside', (t) => {
    t.print(fixture.objectExpressionCommentInside);
    t.end();
});

test('printer: tokenizer: object-expression: space', (t) => {
    t.print(fixture.objectExpressionSpace, {
        format: {
            space: '_',
        },
    });
    t.end();
});

test('printer: tokenizer: object-expression: comment', (t) => {
    const source = fixture.objectExpressionComment;
    const ast = parse(source);
    
    transform(ast, source, {
        rules: {
            'variables': 'off',
            'variables/remove-unused': 'on',
        },
        plugins: ['variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.objectExpressionCommentFix);
    t.end();
});

test('printer: tokenizer: object-expression: parens', (t) => {
    const source = montag`
        const a = () => b;
    `;
    
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            ['object', {
                report: noop,
                fix: (path) => {
                    path.replaceWith(objectExpression([]));
                },
                traverse: ({push}) => ({
                    '() => b': (path) => {
                        push(path.get('body'));
                    },
                }),
            }],
        ],
    });
    
    const result = print(ast);
    const expected = 'const a = () => ({});\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: object-expression: param', (t) => {
    t.print(fixture.objectExpressionParam);
    t.end();
});

test('printer: tokenizer: object-expression: spread: logical', (t) => {
    t.print(fixture.objectSpreadLogical);
    t.end();
});

test('printer: tokenizer: object-expression: nested call', (t) => {
    t.print(fixture.objectExpressionNestedCall);
    t.end();
});

test('printer: tokenizer: object-expression: inside array: with boolean', (t) => {
    t.print(fixture.objectInsideArrayWithBoolean);
    t.end();
});

test('printer: tokenizer: object-expression: as const', (t) => {
    t.print(fixture.objectAsConst);
    t.end();
});

test('printer: tokenizer: object-expression: inside array', (t) => {
    t.print(fixture.objectExpressionInsideArray);
    t.end();
});

test('printer: tokenizer: object-expression: shorthand', (t) => {
    t.print(fixture.objectExpressionShorthand);
    t.end();
});

test('printer: tokenizer: object-expression: third inside array', (t) => {
    t.print(fixture.objectThirdInsideArray);
    t.end();
});

test('printer: tokenizer: object-expression: no-trailing-comma', (t) => {
    t.print(fixture.objectExpressionNoTrailingComma, {
        semantics: {
            trailingComma: false,
        },
    });
    t.end();
});

test('printer: tokenizer: object-expression: method: no-trailing-comma', (t) => {
    t.print(fixture.objectExpressionMethodNoTrailingComma, {
        semantics: {
            trailingComma: false,
        },
    });
    t.end();
});
