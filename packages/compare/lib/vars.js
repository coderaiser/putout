'use strict';

const traverse = require('@babel/traverse').default;
const jessy = require('jessy');
const nessy = require('nessy');
const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const {isIdentifier, isTemplateLiteral} = require('@babel/types');

const {
    is,
    isArgsStr,
    isImportsStr,
} = require('./is');

const {entries, assign} = Object;
const isNumber = (a) => typeof a === 'number';
const parseExpression = (a) => a.expression || a;

module.exports.getTemplateValues = (node, str) => {
    const templateNode = template.ast(str);
    const waysFrom = findVarsWays(templateNode);
    
    return getValues({
        node,
        waysFrom,
    });
};

module.exports.findVarsWays = findVarsWays;

function findVarsWays(node) {
    if (isIdentifier(node) && is(node.name))
        return {
            [node.name]: [''],
        };
    
    const vars = {};
    
    if (isTemplateLiteral(node))
        assign(vars, parseTemplateLiteral(node));
    
    
    traverse(node, {
        noScope: true,
        'Identifier|StringLiteral': collectVars(vars),
    });
    
    return vars;
}

const collectVars = (vars) => (path) => {
    const way = [];
    const {node} = path;
    const {
        name = node.value,
    } = node;
    
    if (!is(name))
        return;
    
    path.find((path) => {
        const {key, listKey} = path;
        
        if (isNumber(key)) {
            way.unshift(`${listKey}.${key}`);
            return;
        }
        
        way.unshift(key);
    });
    
    vars[name] = vars[name] || [];
    vars[name].push(way.join('.'));
};


module.exports.getValues = getValues;

function getValues({waysFrom, node}) {
    const result = {};
    
    for (const [name, ways] of entries(waysFrom)) {
        for (let way of ways) {
            if (isImportsStr(name))
                way = way.replace(/\.0.local$/, '');
            
            else if (isArgsStr(name))
                way = way.replace(/\.0$/, '');
            
            way = way.replace(/\.expression$/, '');
            
            result[name] = result[name] || jessy(way, node) || node;
        }
    }
    
    return result;
}

module.exports.setValues = setValues;

function setValues({waysTo, values, path}) {
    const node = parseExpression(path.node);
    
    for (const [name, ways] of entries(waysTo)) {
        for (let way of ways) {
            if (!way) {
                replaceWith(path, values[name]);
                continue;
            }
            
            if (isArgsStr(name))
                way = way.replace(/\.0$/, '');
            
            nessy(way, values[name], node);
        }
    }
}

function parseTemplateLiteral({quasis}) {
    const n = quasis.length;
    const vars = {};
    
    for (let i = 0; i < n; i++) {
        const {value} = quasis[i];
        const {raw} = value;
        
        if (!raw || !is(raw))
            continue;
        
        vars[raw] = vars[raw] || [];
        vars[raw].push(`quasis.${i}.value`);
    }
    
    return vars;
}
