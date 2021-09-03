'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

const message = 'Keep each element on separate lines';

ruleTester.run('object-property-newline', rule, {
    valid: [`
        const a = [
            1,
        ];
        
        const b = [{
            hello: 'world'
        }];
        
        const c = [env, 'cmd'];
    `],
    invalid: [{
        code: `const x = ['hello', 'world', '!']`,
        output: `const x = [\n'hello',\n 'world',\n '!'\n]`,
        errors: [{
            message,
            type: 'ArrayExpression',
        }],
    }],
});

