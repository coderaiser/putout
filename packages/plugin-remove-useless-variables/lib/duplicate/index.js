import {operator} from 'putout';

const {getTemplateValues} = operator;
const FN = 'const __a = function __a(__args) {__body}';

export const report = (path) => {
    const {__a} = getTemplateValues(path, FN);
    return `Avoid duplicate declaration of '${__a.name}'`;
};

export const replace = () => ({
    'const __a = function __a(__args) {__body}': 'function __a(__args){__body}',
});
