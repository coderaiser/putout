'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
});

ruleTester.run('evaluate', rule, {
    valid: [`
        import a from 'a';
    `],
    
    invalid: [{
        code: `import a from '__putout_evaluate: join(basename(__filename), ".js")'`,
        output: `import a from '<input>/.js'`,
        errors: [{
            message: 'Evaluate expression',
            type: 'ImportDeclaration',
        }],
    }, {
        code: `import a from '__putout_evaluate:join(basename(__filename), ".js")'`,
        output: `import a from '<input>/.js'`,
        errors: [{
            message: 'Evaluate expression',
            type: 'ImportDeclaration',
        }],
    }],
});

