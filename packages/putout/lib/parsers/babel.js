'use strict';

const once = require('once');

const initBabel = once(() => require('@babel/parser'));
const clean = (a) => a.filter(Boolean);
const getFlow = (a) => !a.indexOf('// @flow');
const getJSX = (a) => a.includes('react');

const putoutEditorDefaults = {
    isTS: true,
};

module.exports.parse = function babelParse(source, {isTS, isFlow = getFlow(source), isJSX = getJSX(source)} = putoutEditorDefaults) {
    const {parse} = initBabel();
    
    return parse(source, {
        sourceType: 'module',
        tokens: true,
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        plugins: clean([
            !isTS && !isFlow && 'estree',
            'importMeta',
            'dynamicImport',
            'bigInt',
            'classPrivateProperties',
            'classPrivateMethods',
            'classProperties',
            'numericSeparator',
            'exportDefaultFrom',
            'nullishCoalescingOperator',
            ...getBabelLangExts({
                isTS,
                isFlow,
                isJSX,
            }),
        ]),
    });
};

function getBabelLangExts({isTS, isFlow, isJSX}) {
    const langs = [
        isJSX && 'jsx',
    ];
    
    if (isTS)
        return langs.concat([
            'typescript',
        ]);
    
    if (isFlow)
        return langs.concat([
            'flow',
            'flowComments',
        ]);
    
    return langs;
}

