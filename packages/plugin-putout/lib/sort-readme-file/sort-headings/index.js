import {operator, types} from 'putout';

const {
    getTemplateValues,
    replaceWithMultiple,
    remove,
    compare,
    __markdown,
} = operator;

const {arrayExpression} = types;

const MAX_RULE_HEADING = 2;
const LINK = `li('✅ ', link(__a, __b), ';')`;
const LIST = 'ul(__args)';
const HEADING = 'heading(__a, __b)';
const compareOne = (a) => (b) => compare(b, a);

export const report = ({invalid}) => {
    if (invalid.length)
        return `Avoid using rules with heading level more then 2: '### ${invalid[0]}' -> '## ${invalid[0]}'`;
    
    return `Sort 'contents'`;
};

export const fix = ({path, sorted, rulesHeadings, invalid}) => {
    if (invalid.length)
        return;
    
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
        
        if (!is)
            return;
        
        const invalid = validateRulesHeadings({
            rules,
            elements,
        });
        
        push({
            path,
            rulesHeadings,
            sorted,
            invalid,
        });
    },
});

function validateRulesHeadings({rules, elements}) {
    const invalid = [];
    
    for (const element of elements) {
        if (compare(element, HEADING)) {
            const {__a, __b} = getTemplateValues(element, HEADING);
            const {value} = __b;
            
            if (!rules.has(value))
                continue;
            
            if (__a.value !== MAX_RULE_HEADING) {
                invalid.push(value);
                return invalid;
            }
        }
    }
    
    return invalid;
}

function asc(a, b) {
    return getValue(a).localeCompare(getValue(b));
}

const getValue = (path) => path.node.arguments[1].value;

function packHeadings(elements) {
    let argument;
    
    for (const element of elements) {
        if (isRuleHeading(element)) {
            argument = arrayExpression([]);
            element.node.arguments.push(argument);
            continue;
        }
        
        argument.elements.push(element.node);
        remove(element);
    }
}

function extractHeadings(elements) {
    for (const element of elements.filter(isRuleHeading)) {
        const args = element.node.arguments;
        const argument = args.pop();
        
        replaceWithMultiple(element, [element, ...argument.elements]);
    }
}

function isRuleHeading(element) {
    if (!compare(element, 'heading(__args)'))
        return false;
    
    const {__a} = getTemplateValues(element, 'heading(__a, __b)');
    
    return __a.value <= MAX_RULE_HEADING;
}

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
