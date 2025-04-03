import {operator} from 'putout';

const {addParens} = operator;

export const report = () => `Add missing parens: invalid tagged template on optional chain`;

export const fix = (path) => {
    addParens(path);
};

export const traverse = ({push}) => ({
    TaggedTemplateExpression(path) {
        const tagPath = path.get('tag');
        
        if (tagPath.isOptionalCallExpression()) {
            const {parenthesized} = tagPath.node.extra || {};
            
            if (!parenthesized)
                return push(tagPath);
        }
        
        if (tagPath.isOptionalMemberExpression()) {
            const {parenthesized} = tagPath.node.extra || {};
            
            if (!parenthesized)
                return push(tagPath);
        }
        
        if (tagPath.isTSNonNullExpression()) {
            const expressionPath = tagPath.get('expression');
            const {parenthesized} = expressionPath.node.extra || {};
            
            if (!parenthesized)
                return push(expressionPath);
        }
    },
});
