import {operator, types} from 'putout';

const {
    getTemplateValues,
    replaceWithMultiple,
    remove,
    compare,
    compareAny,
    __markdown,
} = operator;

const {arrayExpression} = types;

export const report = () => `Sort 'contents'`;

export const fix = ({path, sorted, rulesHeadings}) => {
    packHeadings(path.get('arguments.0.elements'));
    const {elements} = path.node.arguments[0];
    
    for (const [i, current] of rulesHeadings.entries()) {
        elements.splice(current.key, 1, sorted[i].node);
    }
    
    extractHeadings(path.get('arguments.0.elements'));
};

export const traverse = ({push}) => ({
    [__markdown](path) {
        const elements = path.get('arguments.0.elements');
        const rules = getRules(elements);
        
        const rulesHeadings = getRulesHeadings({
            elements,
            rules,
        });
        
        const sorted = rulesHeadings.toSorted(asc);
        let is = false;
        
        for (const [index, heading] of rulesHeadings.entries()) {
            if (heading !== sorted[index]) {
                is = true;
                break;
            }
        }
        
        if (is)
            push({
                path,
                rulesHeadings,
                sorted,
            });
    },
});

function asc(a, b) {
    return getValue(a).localeCompare(getValue(b));
}

const getValue = (path) => path.node.arguments[1].value;

function packHeadings(elements) {
    let argument = arrayExpression([]);
    
    for (const element of elements) {
        if (compareAny(element, 'heading(__args)')) {
            const {__a} = getTemplateValues(element, 'heading(__a, __b)');
            
            if (__a.value < 3) {
                argument = arrayExpression([]);
                element.node.arguments.push(argument);
                continue;
            }
        }
        
        argument.elements.push(element.node);
        remove(element);
    }
}

function extractHeadings(elements) {
    for (const element of elements) {
        const args = element.node.arguments;
        const argument = args.pop();
        
        replaceWithMultiple(element, [element, ...argument.elements]);
    }
}

const LINK = `li('✅ ', link(__a, __b), ';')`;
const LIST = 'ul(__args)';
const compareOne = (a) => (b) => compare(b, a);

function getRules(elements) {
    const rules = new Set();
    
    for (const element of elements.filter(compareOne(LIST))) {
        const args = element.node.arguments;
        
        for (const li of args.filter(compareOne(LINK))) {
            const {__a} = getTemplateValues(li, LINK);
            rules.add(__a.value);
        }
    }
    
    return rules;
}

const HEADING = 'heading(__a, __b)';

function getRulesHeadings({rules, elements}) {
    const headings = [];
    
    for (const element of elements) {
        if (compare(element, HEADING)) {
            const {__b} = getTemplateValues(element, HEADING);
            const {value} = __b;
            
            if (rules.has(value))
                headings.push(element);
        }
    }
    
    return headings;
}
