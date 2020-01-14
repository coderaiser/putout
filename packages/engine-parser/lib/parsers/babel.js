'use strict';

const once = require('once');

// stricter validation to prevent even more invalid ASTs: not only
// from a tree shape point of view but also ensuring that nodes in
// the correct position carry valid information. For example, starting
// from Babel 8 t.identifier("123") will be disallowed, because 123 is
// not a valid identifier.
process.env.BABEL_TYPES_8_BREAKING = true;

const initBabel = once(() => require('@babel/parser'));
const clean = (a) => a.filter(Boolean);
const getFlow = (a) => !a.indexOf('// @flow');
const getJSX = (a) => a.includes('react');

const putoutEditorDefaults = {
    isTS: true,
};

const plugins = require('./babel-plugins');
const options = require('./babel-options');

module.exports.parse = function babelParse(source, {isTS, isFlow = getFlow(source), isJSX = getJSX(source)} = putoutEditorDefaults) {
    const {parse} = initBabel();
    
    return parse(source, {
        sourceType: 'module',
        tokens: true,
        ...options,
        plugins: clean([
            !isTS && !isFlow && 'estree',
            ...plugins,
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

