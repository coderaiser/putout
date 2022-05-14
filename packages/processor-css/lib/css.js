import stylelint from 'stylelint';
import {cosmiconfig} from 'cosmiconfig';
import {createConfigLoader} from './config-loader.js';

const loadConfig = createConfigLoader({
    cosmiconfig,
});

export const files = [
    '*.css',
];

export const find = async (code) => {
    const config = await loadConfig();
    const {results} = await stylelint.lint({
        code,
        config,
    });
    
    const {warnings} = results[0];
    const places = warnings.map(toPlace);
    
    return places;
};

export const fix = async (code) => {
    const config = await loadConfig();
    const {output} = await stylelint.lint({
        fix: true,
        code,
        config,
    });
    
    return output;
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

