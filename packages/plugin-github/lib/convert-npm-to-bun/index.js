'use strict';

const {operator} = require('putout');
const {
    traverseProperties,
    setLiteralValue,
    getTemplateValues,
    __yaml,
} = operator;

module.exports.report = () => 'Convert npm to bun';

module.exports.fix = (path) => {
    const {value} = path.node;
    const bun = value
        .replace('npm', 'bun')
        .replace('install', 'i');
    
    const newValue = `${bun} --no-save`;
    
    setLiteralValue(path, newValue);
};

module.exports.traverse = ({push}) => ({
    [__yaml](path) {
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const run of traverseProperties(__object, 'run')) {
            const valuePath = run.get('value');
            const valueStr = valuePath.node.value;
            
            if (!valueStr.includes('npm i') && !valueStr.includes('npm install'))
                continue;
            
            push(valuePath);
        }
    },
});
