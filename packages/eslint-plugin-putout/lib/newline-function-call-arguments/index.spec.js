'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('new-line-function-call-arguments', rule, {
    valid: [`
         const f = () => {
                return {
                    ...pick(a, 'b', 'c')
                }
            };
        `,
    
    `console.log('a', 'b', 'c');`,
    `const onConnectError = squad(
            superFn('connect_error'),
            logWraped(isLog, importStr),
            addUrl(colorUrl),
            getDescription,
        );`,
    `
        test('should be some test', (t) => {
            t.equal();
            t.equal();
            t.equal();
            t.equal();
            t.equal();
            t.end();
        });`,
    `
    report(formatter, {
        name,
        source: input,
        places,
        index,
        count,
        length,
    });
    `,
    `
     clean([
        !isDev && {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        isDev && {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: babelDev,
        }]);
     `,
    `
     sendIndex(p, buildIndex(config, html, {
            ...dir,
            path: format.addSlashToEnd(rootName),
            context,
            directory,
            something,
     }));
     `,
    ],
    
    invalid: [{
        code: `
        const onConnectError = squad(superFn('connect_error'),
        logWraped(isLog, importStr),
        addUrl(colorUrl),
        getDescription);
        `,
        output:
        '\n        const onConnectError = squad(\n' +
        `superFn('connect_error'),
        logWraped(isLog,
` +
        'importStr),\n        addUrl(colorUrl),\n        ' +
        'getDescription\n);\n        ',
        errors: [{
            message: 'Add new line before and after arguments in a function call',
            type: 'CallExpression',
        }],
    }, {
        code: `const f = () => {
                return {
                    ...pick(state, 'showTransformPanel', 'parserSettings', 'parserPerCategory')
                }
            };`,
        output: `const f = () => {
                return {
                    ...pick(\nstate,\n'showTransformPanel',\n'parserSettings',\n'parserPerCategory'\n)
                }
            };`,
        errors: [{
            message: 'Add new line before and after arguments in a function call',
            type: 'CallExpression',
        }],
    }],
});

