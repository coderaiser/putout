import {types, operator} from 'putout';

const {replaceWith, isSimpleRegExp} = operator;
const {stringLiteral} = types;

export const report = () => 'String should be used instead of RegExp';

export const match = () => ({
    '__a.replace(/__b/, __c)': check(''),
    '__a.replaceAll(/__b/g, __c)': check('g'),
});

export const replace = () => ({
    '__a.replace(/__b/, __c)': transform,
    '__a.replaceAll(/__b/g, __c)': transform,
});

const check = (flags) => ({__b}) => {
    if (__b.flags === flags) {
        const {raw} = __b.extra;
        return isSimpleRegExp(raw);
    }
    
    return false;
};

const transform = ({__b}, path) => {
    const {pattern} = __b;
    const regExpPath = path.get('arguments.0');
    
    replaceWith(regExpPath, stringLiteral(pattern));
    
    return path;
};
