import {RuleTester} from 'eslint';
import montag from 'montag';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-empty-specifiers', rule, {
    valid: [
        montag`
            import putout, {transform} from 'putout';
        `,
        montag`
            import putout from 'putout';
        `,
        montag`
            import putout, {/* hello */} from 'putout';
        `,
    ],
    
    invalid: [{
        code: montag`
            import putout, {} from 'putout';
        `,
        output: montag`
            import putout from 'putout';
        `,
        errors: [{
            message: 'Remove empty import specifiers',
        }],
    }, {
        code: montag`
            import {} from 'putout';
        `,
        output: montag`
            import 'putout';
        `,
        errors: [{
            message: 'Remove empty import specifiers',
        }],
    }],
});
