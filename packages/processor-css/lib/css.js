import stylelint from 'stylelint';
import {cosmiconfig} from 'cosmiconfig';
import alignSpaces from 'align-spaces';

import {createConfigLoader} from './config-loader.js';

const loadConfig = createConfigLoader({
    cosmiconfig,
});

export const files = ['*.css'];

export const lint = async (source, {fix} = {}) => {
    const config = await loadConfig();
    const {report, code = ''} = await stylelint.lint({
        fix,
        code: source,
        config,
    });
    
    const {warnings} = JSON.parse(report)[0];
    const places = warnings.map(toPlace);
    const [first] = places;
    
    if (/CssSyntaxError/.test(first?.rule))
        return [code, places];
    
    return [alignSpaces(code), places];
};

function toPlace({line, column, rule, text}) {
    return {
        message: text,
        rule: `${rule} (stylelint)`,
        position: {
            line,
            column,
        },
    };
}
