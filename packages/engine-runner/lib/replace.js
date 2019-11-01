'use strict';

const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const {compare} = require('@putout/compare');
const traverse = require('@babel/traverse').default;

const jessy = require('jessy');
const nessy = require('nessy');

const stub = () => [];
const packKeys = (a) => () => Object.keys(a);
const isNumber = (a) => typeof a === 'number';
const {entries} = Object;

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
                ...options.exclude || [],
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
    const vars = {};
    
    traverse(node, {
        noScope: true,
        Identifier(path) {
            const {name} = path.node;
            const way = [];
            
            if (!/^_[a-z]$/.test(name))
                return;
            
            path.find((path) => {
                const {key, listKey} = path;
                
                if (isNumber(key))
                    return way.unshift(`${listKey}.${key}`);
                
                way.unshift(key);
            });
            
            vars[name] = way.join('.');
        },
    });
    
    return vars;
};

function getValues({waysFrom, node}) {
    const result = {};
    
    for (const [name, way] of entries(waysFrom)) {
        result[name] = jessy(way, node);
    }
    
    return result;
}

function setValues({waysTo, values, path}) {
    for (const [name, way] of entries(waysTo)) {
        nessy(way, values[name], path.node);
    }
}

const fix = (from, to, path) => {
    const nodeFrom = template.ast(from);
    
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
    
    path.stop();
};

const getFix = (items) => (path) => {
    for (const [from, to] of Object.entries(items))
        fix(from, to, path);
};

