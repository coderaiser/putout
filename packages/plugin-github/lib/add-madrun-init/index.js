import {types, operator} from 'putout';

const {
    getTemplateValues,
    __yaml,
    setLiteralValue,
    traverseProperties,
} = operator;

const {
    objectExpression,
    stringLiteral,
    objectProperty,
} = types;

export const report = () => `Add 'madrun init'`;

export const fix = (path) => {
    const name = objectProperty(stringLiteral('name'), stringLiteral('Init Madrun'));
    const run = objectProperty(stringLiteral('run'), stringLiteral('madrun init'));
    
    path.parentPath.node.elements.splice(path.key + 1, 0, objectExpression([name, run]));
    
    const [runPath] = traverseProperties(path, 'run');
    
    const {value} = runPath.node.value;
    setLiteralValue(runPath.node.value, value.replace('redrun', 'redrun madrun'));
};

export const traverse = ({push}) => ({
    [__yaml]: (path) => {
        const {__object} = getTemplateValues(path, __yaml);
        const [stepsPath] = traverseProperties(__object, 'steps');
        
        if (!stepsPath)
            return;
        
        const stepsPathValue = stepsPath.get('value');
        const steps = stepsPathValue.get('elements');
        
        const typosSteps = [];
        
        for (const step of steps) {
            const name = parseName(step);
            
            if (name === 'Install Redrun') {
                typosSteps.push(step);
                continue;
            }
            
            if (name === 'Init Madrun') {
                typosSteps.push(step);
                continue;
            }
        }
        
        if (typosSteps.length !== 1)
            return;
        
        typosSteps.map(push);
    },
});

const createParseStep = (name) => (step) => {
    const properties = step.get('properties');
    
    for (const prop of properties) {
        const key = prop.get('key.value').node;
        
        if (key === name)
            return prop.get('value.value').node;
    }
    
    return '';
};

const parseName = createParseStep('name');

