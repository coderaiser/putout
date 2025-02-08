'use strict';

const once = require('once');

const plugins = require('./plugins');
const options = require('./options');
const getFlow = (a) => !a.indexOf('// @flow');
const clean = (a) => a.filter(Boolean);
const initBabel = once(() => require('@putout/babel'));

module.exports.parse = function babelParse(source, {sourceFileName, isTS, isJSX = true, isFlow = getFlow(source), isRecovery}) {
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
    
    return parse(source, parserOptions);
};

function getBabelLangExts({isTS, isFlow, isJSX}) {
    const langs = [
        isJSX && 'jsx',
    ];
    
    if (isTS || isFlow)
        return langs.concat(['typescript']);
    
    return langs;
}
