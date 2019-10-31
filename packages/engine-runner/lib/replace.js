'use strict';

const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const {compare} = require('@putout/compare');
const traverse = require('@babel/traverse').default;
const {BlockStatement} = require('@babel/types');

const jessy = require('jessy');
const nessy = require('nessy');

const stub = () => [];
const packKeys = (a) => () => Object.keys(a);
const isNumber = (a) => typeof a === 'number';

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

const findTemplateVars = (node) => {
    const vars = [];
    
    traverse(BlockStatement([node]), {
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
            
            vars.unshift(way.join('.'));
        },
    });
    
    return vars;
};

function getValues(routes, node) {
    const result = {};
    
    for (const route of routes) {
        result[route] = jessy(route, node);
    }
    
    return result;
}

function setValues(values, node) {
    for (const [route, value] of Object.entries(values)) {
        nessy(route, value, node);
    }
}

const fix = (from, to, path) => {
    if (!compare(path, from))
        return;
    
    if (!to)
        return path.remove();
    
    const {node} = path;
    
    const nodeTo = template.ast(to);
    const templateVars = findTemplateVars(nodeTo);
    const values = getValues(templateVars, node);
    
    replaceWith(path, nodeTo);
    setValues(values, path.node);
};

const getFix = (items) => (path) => {
    for (const [from, to] of Object.entries(items))
        fix(from, to, path);
};

