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
        quietDeprecationWarnings: true,
    });
    
    const {warnings} = JSON.parse(report)[0];
    const places = warnings.map(toPlace);
    const [first] = places;
    
    if (/CssSyntaxError/.test(first?.rule))
        return [code, places];
    
    return [
        alignSpaces(code),
        places,
    ];
};

const toPlace = ({line, column, rule, text}) => ({
    message: text.replace(` (${rule})`, ''),
    rule: `${rule} (stylelint)`,
    position: {
        line,
        column,
    },
});

