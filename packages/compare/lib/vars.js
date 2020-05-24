'use strict';

const traverse = require('@babel/traverse').default;
const {isIdentifier} = require('@babel/types');
const jessy = require('jessy');
const nessy = require('nessy');
const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');

const {
    is,
    isArgsStr,
    isImportsStr,
} = require('./is');

const {entries} = Object;
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
    
    traverse(node, {
        noScope: true,
        'Identifier|StringLiteral'(path) {
            const way = [];
            const {
                name = path.node.value,
            } = path.node;
            
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
        },
    });
    
    return vars;
}

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

