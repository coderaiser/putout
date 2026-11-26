import {types, operator} from 'putout';

const {stringLiteral} = types;

const {
    replaceWith,
    getTemplateValues,
    isSimpleRegExp,
} = operator;

const decode = (a) => {
    return a
        .replaceAll('\\n', '\n')
        .replaceAll(/\\([^\w\s])/g, '$1');
};

export const report = () => `Use 'replaceAll()' instead of 'replace()'`;

export const fix = ({path, pattern}) => {
    const regExpPath = path.get('arguments.0');
    const calleePath = path.get('callee.property');
    
    replaceWith(regExpPath, stringLiteral(decode(pattern)));
    calleePath.node.name = 'replaceAll';
    
    return path;
};

export const traverse = ({push}) => ({
    '__a.replace(/__b/g, __c)': (path) => {
        const {__b} = getTemplateValues(path, '__a.replace(/__b/g, __c)');
        
        const {
            flags,
            raw,
            pattern,
        } = __b;
        
        if (flags !== 'g')
            return false;
        
        if (!isSimpleRegExp(raw))
            return;
        
        push({
            path,
            pattern,
        });
    },
});
