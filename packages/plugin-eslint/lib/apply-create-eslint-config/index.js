import {types, operator} from 'putout';

const {replaceWith} = operator;
const {isSpreadElement} = types;

export const report = () => `Use 'createESLintConfig()' instead of spread ('...')`;

export const match = () => ({
    'module.exports = __array': hasSpreads({
        selector: 'right.elements',
    }),
    'export default __array': hasSpreads({
        selector: 'declaration.elements',
    }),
});

export const replace = () => ({
    'module.exports = __array': extractSpreads({
        selector: 'right.elements',
        template: 'module.exports = createESLintConfig(__array)',
    }),
    'export default __array': extractSpreads({
        selector: 'declaration.elements',
        template: 'export default createESLintConfig(__array)',
    }),
});

const hasSpreads = ({selector}) => (vars, path) => {
    const elements = path.get(selector);
    
    for (const element of elements) {
        if (isSpreadElement(element))
            return true;
    }
    
    return false;
};

const extractSpreads = ({selector, template}) => (vars, path) => {
    const elements = path.get(selector);
    
    for (const element of elements) {
        if (!isSpreadElement(element))
            continue;
        
        replaceWith(element, element.node.argument);
    }
    
    return template;
};
