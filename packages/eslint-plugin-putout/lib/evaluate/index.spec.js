import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
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
        }],
    }, {
        code: `import a from '__putout_evaluate:join(basename(__filename), ".js")'`,
        output: `import a from '<input>/.js'`,
        errors: [{
            message: 'Evaluate expression',
        }],
    }],
});
