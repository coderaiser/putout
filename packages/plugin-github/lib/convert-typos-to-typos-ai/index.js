import {operator, types} from 'putout';
import {createParseStep} from './parse-step.js';

const {
    traverseProperties,
    getTemplateValues,
    __yaml,
    remove,
} = operator;

const {
    stringLiteral,
    objectProperty,
} = types;

const parseName = createParseStep('name');
const parseUses = createParseStep('uses');

const TYPOS_AI = 'coderaiser/typos.ai@v2.0.0';

export const report = () => `Use 'typos.ai' instead of 'typos'`;

export const fix = (path) => {
    const name = parseName(path);
    
    if (name !== 'Typos') {
        remove(path);
        return;
    }
    
    const properties = path.get('properties');
    
    for (const prop of properties) {
        if (prop.node.key.value === 'run')
            remove(prop);
    }
    
    const uses = objectProperty(stringLiteral('uses'), stringLiteral(TYPOS_AI));
    
    path.node.properties.push(uses);
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
            
            if (name === 'Typos') {
                typosSteps.push(step);
                continue;
            }
            
            if (name === 'Typos Install') {
                typosSteps.push(step);
                continue;
            }
            
            if (name === 'Install Rust') {
                typosSteps.push(step);
                continue;
            }
            
            const uses = parseUses(step);
            
            if (uses.includes('actions/cache'))
                typosSteps.push(step);
        }
        
        if (typosSteps.length !== 4)
            return;
        
        typosSteps.map(push);
    },
});
