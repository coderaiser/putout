'use strict';

const traverse = require('@babel/traverse').default;
const jessy = require('jessy');
const nessy = require('nessy');
const {template} = require('@putout/engine-parser');
const {replaceWith, extract} = require('@putout/operate');
const {
    isIdentifier,
    isBlockStatement,
} = require('@babel/types');

const {
    is,
    isArgsStr,
    isImportsStr,
} = require('./is');

const {entries} = Object;
const isNumber = (a) => typeof a === 'number';
const isString = (a) => typeof a === 'string';
const parseExpression = (a) => a.expression || a;

const parseNode = (a) => a.node || a;

const {stringify} = JSON;

module.exports.getTemplateValues = (node, str) => {
    if (!isString(str))
        throw Error(`☝️ Looks like argument 'template' of 'getTemplateValues(node, template)': is not a string, but '${stringify(str)}'`);
    
    node = parseNode(node);
    
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
        'Identifier|StringLiteral|TemplateElement|RegExpLiteral'(path) {
            const {node} = path;
            const way = [];
            const name = extract(node);
            
            if (!is(name))
                return;
            
            path.find(({key, listKey}) => {
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
            
            result[name] = result[name] || jessy(way, node);
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
            
            if (isBlockStatement(values[name]))
                way = way.replace(/\.expression$/, '');
            
            nessy(way, values[name], node);
        }
    }
}

