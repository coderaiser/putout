'use strict';

const {operator, template} = require('putout');
const {
    compare,
    traverseProperties,
    getTemplateValues,
} = operator;

const BUN = template.ast(`({
    "uses": "oven-sh/setup-bun@v1",
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
            if (compare(step, BUN))
                return;
        }
        
        for (const [index, step] of steps.entries()) {
            const prop = step.get('properties.0');
            const valueStr = prop
                .get('value')
                .toString();
            
            if (!valueStr.includes('actions/checkout'))
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
