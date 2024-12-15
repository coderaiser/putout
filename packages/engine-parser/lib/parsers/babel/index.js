'use strict';

const once = require('once');

const plugins = require('./plugins');
const options = require('./options');
const getFlow = (a) => !a.indexOf('// @flow');
const clean = (a) => a.filter(Boolean);
const initBabel = once(() => require('@putout/babel'));
const {assign} = Object;

// There is a difference in options naming for babel and recast
// recast -> sourceFileName
// babel, putout: sourceFilename
module.exports.parse = function babelParse(source, {sourceFilename, isTS, isJSX = true, isFlow = getFlow(source), isRecovery}) {
    const {parse} = initBabel();
    const parserOptions = {
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
    
    sourceFilename && assign(parserOptions, {
        sourceFilename,
    });
    
    return parse(source, parserOptions);
};

function getBabelLangExts({isTS, isFlow, isJSX}) {
    const langs = [
        isJSX && 'jsx',
    ];
    
    if (isTS)
        return langs.concat(['typescript']);
    
    if (isFlow)
        return langs.concat(['flow', 'flowComments']);
    
    return langs;
}
