'use strict';

const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const traverse = require('@babel/traverse').default;
const {isIdentifier} = require('@babel/types');
const {
    compare,
    isName,
    isArgs,
    isImports,
} = require('@putout/compare');

const jessy = require('jessy');
const nessy = require('nessy');

const maybeArray = require('./maybe-array');

const {keys, entries} = Object;

const stub = () => [];
const packKeys = (a) => () => keys(a);
const isNumber = (a) => typeof a === 'number';

const parseExpression = (a) => a.expression || a;

module.exports = ({rule, plugin, msg, options}) => {
    const {
        report,
        exclude = stub,
        replace,
        filter,
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
            filter,
            include,
        },
    };
};

const findVarsWays = (node) => {
    if (isIdentifier(node) && isName(node.name))
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
            
            if (!isName(name) && !isImports(name) && !isArgs(name))
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
        for (let way of ways) {
            if (isImports(name))
                way = way.replace(/\.0.local$/, '');
            
            else if (isArgs(name))
                way = way.replace(/\.0$/, '');
            
            result[name] = result[name] || jessy(way, node);
        }
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
        
        for (let way of ways) {
            if (isArgs(name))
                way = way.replace(/\.0$/, '');
            
            nessy(way, values[name], node);
        }
    }
}

const isFn = (a) => typeof a === 'function';
const parseTo = (to, values) => isFn(to) ? to(values) : to;

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
    
    const waysFrom = findVarsWays(nodeFrom);
    const {node} = path;
    
    const values = getValues({
        waysFrom,
        node,
    });
    
    const toStr = parseTo(to, values);
    const nodeTo = template.ast.fresh(toStr);
    const waysTo = findVarsWays(nodeTo);
    const newPath = replaceWith(path, nodeTo);
    
    setValues({
        waysTo,
        values,
        path: newPath,
    });
    
    path._putout.push(watermark);
};

const getFix = (items) => (path) => {
    for (const [from, to] of entries(items))
        fix(from, to, path);
};

