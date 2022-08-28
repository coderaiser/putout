'use strict';

const {join} = require('path');

const {readFileSync} = require('fs');

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

ruleTester.run('add-newline-before-function-call', rule, {
    valid: [
        montag`
            test('hello: world', (t) => {
                const a = 5;
                twoStatements();
            });
        `,
        montag`
            test('hello: world', (t) => {
                oneStatement();
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                
                newlineBeforeCall();
            });
        `, montag`
            test('hello: world', (t) => {
                const a = 5;
                
                const b = 4;
                newlineBeforeVar(b);
            });
        `, montag`
            {
                const a = 5;
                const fullText = getText(node, 10).replace(text, '');
                
                if (/^\\n +\\n +$/.test(fullText)) 
                    fn();
            }
        `, montag`
            test('putout: cli: addOnce', (t) => {
                const fn = stub();
                const {_addOnce} = reRequire('.');
                const emitter = new EventEmitter();
                
                _addOnce(emitter, 'hello', fn);
                _addOnce(emitter, 'hello', fn);
                
                const result = emitter.listenerCount('hello');
                
                t.equal(result, 1);
                t.end();
            });
        `, montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                // hello world
                newlineBeforeVar(b);
            });
        `,
        '{\n    const a = 5;\n    const b = 4;\n\n    hello();}',
        '{\n    const a = 5;\n\n    const b = 4;\n    hello();}',
        montag`
        {
            let fileList = [];
            let allPlaces = [];
            let merge = null;
            
            ({fileList, merge, isProcessed, processedSource, processedPlaces} = await getFiles({
                name,
                fix,
                rawSource,
                processorRunners,
            }));
            
            ({processedSource, allPlaces} = await iterate({
            }));
        }
        `,
    ],
    
    invalid: [{
        code: montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                hello();
            });
        `,
        output:
            `test('hello: world', (t) => {\n` +
            '    const a = 5;\n' +
            '    const b = 4;\n' +
            '    \n' +
            'hello();\n' +
            '});',
        
        errors: [{
            message: 'Add newline before expression',
            type: 'CallExpression',
        }],
    }, {
        code: montag`
            test('hello: world', (t) => {
                if (m) {
                    const a = 5;
                    const b = 4;
                    hello();
                }
            });
        `,
        output:
            `test('hello: world', (t) => {\n` +
            '    if (m) {\n' +
            '        const a = 5;\n' +
            '        const b = 4;\n' +
            '        \n' +
            'hello();\n' +
            '    }\n' +
            '});',
        errors: [{
            message: 'Add newline before expression',
            type: 'CallExpression',
        }],
    }, {
        code: readFixture('assignment'),
        output: readFixture('assignment-fix'),
        errors: [{
            message: 'Add newline before expression',
            type: 'AssignmentExpression',
        }],
    }, {
        code: readFixture('before-newline'),
        output: readFixture('before-newline-fix'),
        errors: [{
            message: 'Add newline before expression',
            type: 'CallExpression',
        }],
    }],
});

