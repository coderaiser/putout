import {tryCatch} from 'try-catch';
import putout from 'putout';

const {types, operator} = putout;

const {getTemplateValues} = operator;

const DECLARE_ESM = 'export const declare = () => __object';
const DECLARE_COMMONJS = 'module.exports.declare = () => __object';
const COMMONJS = 'module.exports = __object';

const {
    isTemplateLiteral,
    isStringLiteral,
} = types;

export const report = ({message}) => message;

export const fix = () => {};
export const traverse = ({push}) => ({
    [DECLARE_ESM]: createCheck(push, DECLARE_ESM),
    [DECLARE_COMMONJS]: createCheck(push, DECLARE_COMMONJS),
    [COMMONJS]: createCheck(push, COMMONJS),
});

const createCheck = (push, template) => (path) => {
    const {__object} = getTemplateValues(path, template);
    
    const lines = [];
    
    for (const {value} of __object.properties) {
        let current = '';
        
        if (isStringLiteral(value)) {
            current = value.value;
        } else if (isTemplateLiteral(value)) {
            if (value.quasis.length > 1)
                continue;
            
            current = value.quasis[0].value.cooked;
        }
        
        if (/^(const|import)/.test(current))
            lines.push(current);
    }
    
    const source = lines.join(';\n');
    const [error] = tryCatch(putout.parse, source);
    
    if (!error)
        return;
    
    const {message} = error;
    
    push({
        path,
        message,
    });
};
