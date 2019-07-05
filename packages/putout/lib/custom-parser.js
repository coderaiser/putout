'use strict';

const once = require('once');

/* eslint node/no-unpublished-require: 0 */
const initBabel = once(() => require('@babel/parser'));
const initEspree = once(() => require('espree'));
const initAcorn = once(() => {
    /* eslint node/no-unpublished-require: 0 */
    const {Parser} = require('acorn');
    const jsx = require('acorn-jsx');
    const stage3 = require('acorn-stage3');
    
    return Parser.extend(stage3, jsx());
});

module.exports = (source, {parser, isTS, isFlow, isJSX}) => {
    if (parser === 'babel')
        return babelParse(source, {
            isTS,
            isFlow,
            isJSX,
        });
    
    if (parser === 'espree')
        return espreeParse(source);
    
    if (parser === 'acorn')
        return acornParse(source);
    
    return require(parser).parse(source);
};

const clean = (a) => a.filter(Boolean);
const getFlow = (a) => !a.indexOf('// @flow');
const getJSX = (a) => a.includes('react');

function babelParse(source, {isTS, isFlow = getFlow(source), isJSX = getJSX(source)}) {
    const {parse} = initBabel();
    
    return parse(source, {
        sourceType: 'module',
        tokens: true,
        allowReturnOutsideFunction: true,
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
            ...getBabelLangExts({
                isTS,
                isFlow,
                isJSX,
            }),
        ]),
    });
}

function espreeParse(source) {
    const {parse} = initEspree();
    const preventUsingEsprima = true;
    
    return parse(source, {
        loc: true,
        tokens: preventUsingEsprima,
        comment: true,
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    });
}

function acornParse(source) {
    const parser = initAcorn();
    const options = {
        locations: true,
        comment: true,
        ecmaVersion: 2019,
        sourceType: 'module',
    };
    
    const tokensData = parser.tokenizer(source, options);
    const tokensToAvoidEsprima = [
        ...tokensData,
    ];
    
    const result = parser.parse(source, options);
    
    return {
        ...result,
        tokens: tokensToAvoidEsprima,
    };
}

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

