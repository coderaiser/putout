import {operator} from 'putout';

const {
    getTemplateValues
} = operator;

module.exports.traverse = () => ({
    'const __a = __b': (path) => {
        const {__a} = getTemplateValues(path, 'const __a = __b');
    }
});
