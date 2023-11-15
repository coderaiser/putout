'use strict';

const {operator} = require('putout');
const {
    traverseProperties,
    setLiteralValue,
    getTemplateValues,
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
    '__putout_processor_yaml(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_yaml(__a)');
        
        for (const run of traverseProperties(__a, 'run')) {
            const valuePath = run.get('value');
            const valueStr = valuePath.node.value;
            
            if (!valueStr.includes('npm i') && !valueStr.includes('npm install'))
                continue;
            
            push(valuePath);
        }
    },
});
