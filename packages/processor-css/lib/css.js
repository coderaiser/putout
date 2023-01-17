import stylelint from 'stylelint';
import {cosmiconfig} from 'cosmiconfig';
import {createConfigLoader} from './config-loader.js';

const loadConfig = createConfigLoader({
    cosmiconfig,
});

export const files = [
    '*.css',
];

export const lint = async (code, {fix}) => {
    const config = await loadConfig();
    const {output, results} = await stylelint.lint({
        fix,
        code,
        config,
    });
    
    const {warnings} = results[0];
    const places = warnings.map(toPlace);
    const [first] = places;
    
    if (/CssSyntaxError/.test(first?.rule))
        return [code, places];
    
    return [output, places];
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

