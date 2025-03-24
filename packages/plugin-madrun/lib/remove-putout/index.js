import {types, operator} from 'putout';

const {remove} = operator;
const {isStringLiteral} = types;

export const report = () => `scripts should not have a name "putout", because "putout" is "lint"`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const properties = path.get('right.properties');
        
        for (const prop of properties) {
            const {key} = prop.node;
            
            if (!isStringLiteral(key))
                continue;
            
            if (key.value === 'putout')
                return push(prop);
        }
    },
});
