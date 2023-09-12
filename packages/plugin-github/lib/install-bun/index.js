'use strict';

const {operator, template} = require('putout');
const {
    traverseProperties,
    getTemplateValues,
} = operator;

const BUN_USES = 'oven-sh/setup-bun@v1';

const BUN = template.ast(`({
    "uses": "${BUN_USES}",
    "with": {
        "bun-version": "latest"
    }
})`);

delete BUN.extra;

module.exports.report = () => 'Install Bun';

module.exports.fix = ({index, stepsPathValue}) => {
    stepsPathValue.node.elements.splice(index + 1, 0, BUN);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        const [stepsPath] = traverseProperties(__a, 'steps');
        
        if (!stepsPath)
            return;
        
        const stepsPathValue = stepsPath.get('value');
        const steps = stepsPathValue.get('elements');
        
        for (const step of steps) {
            const uses = parseUses(step);
            
            if (uses.startsWith(BUN_USES))
                return;
        }
        
        for (const [index, step] of steps.entries()) {
            const uses = parseUses(step);
            
            if (!uses.startsWith('actions/checkout'))
                continue;
            
            push({
                index,
                stepsPathValue,
                path: step,
            });
            return;
        }
    },
});

function parseUses(step) {
    const properties = step.get('properties');
    
    for (const prop of properties) {
        const key = prop.get('key.value').node;
        
        if (key === 'uses')
            return prop.get('value.value').node;
    }
    
    return '';
}
