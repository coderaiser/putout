import {
    types,
    operator,
} from 'putout';
import getProperty from '../get-property.js';

const {setLiteralValue} = operator;

const {
    isStringLiteral,
    isTemplateLiteral,
} = types;

const isUM = (a) => a.includes(' -um');
const isDot = (a) => a === 'putout .';
const isJS = (a) => a.includes('*.js');

export const report = () => '"lint" should check ".madrun.js"';

export const fix = ({node}) => {
    if (isStringLiteral(node)) {
        const result = addMadrun(node.value);
        setLiteralValue(node, result);
        
        return;
    }
    
    const result = addMadrun(node.value.raw);
    
    node.value.raw = result;
    node.value.cooked = result;
};

function getValue(body) {
    if (isStringLiteral(body))
        return [
            body,
            body.value,
        ];
    
    if (!isTemplateLiteral(body))
        return [body, ''];
    
    if (body.expressions.length)
        return [body, ''];
    
    const [line] = body.quasis;
    
    return [
        line,
        line.value.raw,
    ];
}

export const traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const rightPath = path.get('right');
        const lint = getProperty(rightPath, 'lint');
        const value = lint.get('value');
        
        const {body} = value.node;
        const [node, str] = getValue(body);
        
        if (!str)
            return;
        
        if (!isJS(str) && !isDot(str) && !isUM(str) && !/\.madrun/.test(str))
            return push({
                path: rightPath,
                lint,
                node,
            });
    },
});

function addMadrun(a) {
    if (!a.includes('.madrun') && a.includes('madrun'))
        return a.replace('madrun', '.madrun');
    
    if (a.includes('test'))
        return a.replace('test', 'test madrun.js');
    
    return `${a} madrun.js`;
}
