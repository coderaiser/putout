import {parse as babelParse} from '@putout/babel';
import plugins from './plugins.js';
import * as options from './options.js';

const {assign} = Object;
const getFlow = (a) => !a.indexOf('// @flow');
const clean = (a) => a.filter(Boolean);

export const parse = (source, overrides) => {
    const {
        sourceFileName,
        isTS,
        isJSX = true,
        isFlow = getFlow(source),
        isRecovery,
        printer,
    } = overrides;
    
    const parserOptions = {
        sourceFileName,
        sourceType: 'module',
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
            tokens: true,
        });
    
    const ast = babelParse(source, parserOptions);
    
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
