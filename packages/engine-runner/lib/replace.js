'use strict';

const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const {compare} = require('@putout/compare');
const traverse = require('@babel/traverse').default;
const {isIdentifier} = require('@babel/types');

const jessy = require('jessy');
const nessy = require('nessy');

const maybeArray = require('./maybe-array');

const stub = () => [];
const packKeys = (a) => () => Object.keys(a);
const isNumber = (a) => typeof a === 'number';
const {entries} = Object;

const isNameTemplate = (a) => /^__[a-z]$/.test(a);
const parseExpression = (a) => a.expression || a;

module.exports = ({rule, plugin, msg, options}) => {
    const {
        report,
        exclude = stub,
        replace,
    } = plugin;
    
    const replaceItems = replace();
    const fix = getFix(replaceItems);
    const include = packKeys(replaceItems);
    
    return {
        rule,
        msg,
        options: {
            ...options,
            exclude: [
                ...exclude(),
                ...maybeArray(options.exclude),
            ],
        },
        plugin: {
            report,
            fix,
            include,
        },
    };
};

const findVarsWays = (node) => {
    if (isIdentifier(node) && isNameTemplate(node.name))
        return {
            [node.name]: '',
        };
    
    const vars = {};
    
    traverse(node, {
        noScope: true,
        'Identifier|StringLiteral'(path) {
            const {
                name = path.node.value,
            } = path.node;
            const way = [];
            
            if (!isNameTemplate(name))
                return;
            
            path.find((path) => {
                const {key, listKey} = path;
                
                if (isNumber(key)) {
                    way.unshift(`${listKey}.${key}`);
                    return;
                }
                
                if (key === 'expression')
                    return;
                
                way.unshift(key);
            });
            
            vars[name] = vars[name] || [];
            vars[name].push(way.join('.'));
        },
    });
    
    return vars;
};

function getValues({waysFrom, node}) {
    const result = {};
    
    for (const [name, ways] of entries(waysFrom)) {
        for (const way of ways)
            result[name] = result[name] || jessy(way, node);
    }
    
    return result;
}

function setValues({waysTo, values, path}) {
    const node = parseExpression(path.node);
    
    for (const [name, ways] of entries(waysTo)) {
        if (!ways) {
            replaceWith(path, values[name]);
            continue;
        }
        
        for (const way of ways) {
            nessy(way, values[name], node);
        }
    }
}

const fix = (from, to, path) => {
    const nodeFrom = template.ast(from);
    const watermark = `${from} -> ${to}`;
    
    path._putout = path._putout || [];
    
    if (path._putout.includes(watermark))
        return;
    
    if (!compare(path, nodeFrom))
        return;
    
    if (!to)
        return path.remove();
    
    const nodeTo = template.ast.fresh(to);
    const {node} = path;
    
    const waysFrom = findVarsWays(nodeFrom);
    const waysTo = findVarsWays(nodeTo);
    const values = getValues({
        waysFrom,
        node,
    });
    
    replaceWith(path, nodeTo);
    
    setValues({
        waysTo,
        values,
        path,
    });
    
    path._putout.push(watermark);
};

const getFix = (items) => (path) => {
    for (const [from, to] of Object.entries(items))
        fix(from, to, path);
};

