import {operator, types} from 'putout';

const {isStringLiteral} = types;
const {
    __ignore,
    setLiteralValue,
} = operator;

export const report = () => `Use '*.lock' instead of '*.loc'`;

export const fix = (path) => {
    setLiteralValue(path, '*.lock');
};

export const traverse = ({push}) => ({
    [__ignore]: (path) => {
        const elements = path.get('arguments.0.elements');
        
        for (const element of elements) {
            if (isStringLiteral(element.node, {value: '*.loc'}))
                push(element);
        }
    },
});
