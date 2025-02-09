'use strict';

const once = require('once');

const plugins = require('./plugins');
const options = require('./options');
const {assign} = Object;
const getFlow = (a) => !a.indexOf('// @flow');
const clean = (a) => a.filter(Boolean);
const initBabel = once(() => require('@putout/babel'));

module.exports.parse = function babelParse(source, overrides) {
    const {
        sourceFileName,
        isTS,
        isJSX = true,
        isFlow = getFlow(source),
        isRecovery,
        printer,
    } = overrides;
    
    const {parse} = initBabel();
    const parserOptions = {
        sourceFileName,
        sourceType: 'module',
        tokens: true,
        ...options,
        errorRecovery: isRecovery,
        plugins: clean([
            ...plugins,
            ...getBabelLangExts({
                isTS,
                isFlow,
                isJSX,
            }),
        ]),
    };
    
    if (printer === 'babel')
        assign(parserOptions, {
            createParenthesizedExpressions: true,
        });
    
    const ast = parse(source, parserOptions);
    
    ast.program.extra.__putout_printer = printer;
    return ast;
};

function getBabelLangExts({isTS, isFlow, isJSX}) {
    const langs = [
        isJSX && 'jsx',
    ];
    
    if (isTS || isFlow)
        return langs.concat(['typescript']);
    
    return langs;
}
