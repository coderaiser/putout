'use strict';

const {readFileSync} = require('fs');

const {join} = require('path');

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('keyword-spacing', rule, {
    valid: [`
        function hello({a, b, c}) {
        }
    `, `
        ({a, b, c}) => {
        }
    `, `
        ({a, b, c}) => {
            return x(
                a,
                b,
            );
        }
    `],
    
    invalid: [{
        code: `function hello(
            {a, b, c}
        ) {}`,
        output: `function hello({a, b, c}) {}`,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: `(
            {a, b, c}
        ) => {}`,
        output: `({a, b, c}) => {}`,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: `(
            {a, b, c},
        ) => {}`,
        output: `({a, b, c}) => {}`,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: `
            regexpTree.traverse(ast, {
                RegExp(
                    {node},
                ) {
                    const {body} = node;
                }
            });
            `,
        output: `
            regexpTree.traverse(ast, {
                RegExp({node}) {
                    const {body} = node;
                }
            });
            `,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: readFixture('fn'),
        output: readFixture('fn-fix'),
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }],
});

