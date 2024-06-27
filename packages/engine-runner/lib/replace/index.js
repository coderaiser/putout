'use strict';

const {template, print} = require('@putout/engine-parser');
const {remove, replaceWith} = require('@putout/operate');
const {types} = require('@putout/babel');
const {parseTemplateFunctions} = require('./parse-template-functions');

const {
    compare,
    findVarsWays,
    getValues,
    setValues,
} = require('@putout/compare');

const debug = require('debug')('putout:runner:replace');
const maybeArray = require('../maybe-array');

const watermark = require('./watermark');
const {
    isExpression,
    isStatement,
    isExpressionStatement,
} = types;

const PRINT_OPTIONS = {
    printer: ['putout', {
        format: {
            newline: '',
            indent: '',
            splitter: ' ',
            endOfFile: '',
        },
    }],
};

const isString = (a) => typeof a === 'string';

const log = (from, path) => {
    debug.enabled && debug(`${from} -> ${path}\n`);
};

const {keys, entries} = Object;

const {stringify} = JSON;

const stub = () => [];
const stubMatch = () => ({});
const packKeys = (a) => () => keys(a);
const isObj = (a) => typeof a === 'object';

module.exports = ({rule, plugin, msg, options}) => {
    const {
        report,
        exclude = stub,
        replace,
        filter = getFilter(plugin.match, options),
    } = plugin;
    
    const replaceItems = replace({
        options,
    });
    
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

module.exports.clearWatermark = (ast) => {
    delete ast.program[watermark.REPLACE_WATERMARK];
};

const isFn = (a) => typeof a === 'function';

const fix = (from, to, path) => {
    const nodeFrom = template.ast(from);
    const mark = watermark(from, to, path);
    
    mark.init();
    
    if (mark.has())
        return;
    
    if (!compare(path, nodeFrom, {findUp: false}))
        return;
    
    const waysFrom = findVarsWays(nodeFrom);
    const {node} = path;
    
    const values = getValues({
        waysFrom,
        node,
    });
    
    const nodeTo = parseTo(to, values, path);
    
    if (!nodeTo) {
        log(from, `''`);
        return remove(path);
    }
    
    checkExpressionStatement(nodeFrom, nodeTo, path);
    
    const waysTo = findVarsWays(nodeTo);
    const newPath = replaceWith(path, nodeTo);
    
    if (!nodeTo.__putout_replace_cooked) {
        validateTemplateValues(waysTo, waysFrom);
        
        setValues({
            waysTo,
            values,
            path: newPath,
        });
    }
    
    parseTemplateFunctions(path);
    
    mark.add();
    path
        .scope
        .getBlockParent()
        .crawl();
    
    log(from, newPath);
};

const getFix = (items) => (path) => {
    for (const [from, to] of entries(items))
        fix(from, to, path);
};

const getFilter = (match = stubMatch, options) => (path) => {
    const all = entries(match({
        options,
    }));
    
    for (const [from, matchProperty] of all) {
        const nodeFrom = template.ast(from);
        
        if (!compare(path.node, nodeFrom))
            continue;
        
        const waysFrom = findVarsWays(nodeFrom);
        const {node} = path;
        
        const values = getValues({
            waysFrom,
            node,
        });
        
        validateMatchProperty(matchProperty);
        
        return matchProperty(values, path);
    }
    
    return true;
};

function parseTo(to, values, path) {
    const toStr = isFn(to) ? to(values, path) : to;
    
    if (!toStr)
        return null;
    
    if (isObj(toStr) && toStr.type) {
        toStr.__putout_replace_cooked = true;
        return toStr;
    }
    
    if (!isString(toStr))
        throw Error(`☝️ Looks like you passed 'replace' value with a wrong type. Allowed: 'string', 'node' and 'path'. Received: '${typeof toStr}' with value '${toStr}'.`);
    
    return template.ast.fresh(toStr);
}

function validateMatchProperty(match) {
    if (!isFn(match))
        throw Error(`☝️ Looks like 'match' property value is not a 'function', but '${typeof match}' with value '${match}'.`);
}

const validateTemplateValues = (a, b) => {
    for (const key of keys(a)) {
        if (!b[key])
            throw Error(`☝️ Looks like template values not linked: ${stringify(keys(b))} -> ${stringify(keys(a))}`);
    }
};

function checkExpressionStatement(nodeFrom, nodeTo, path) {
    if (!isExpression(nodeFrom))
        return;
    
    if (!isStatement(nodeTo) || isExpressionStatement(nodeTo))
        return;
    
    if (isExpressionStatement(path) || isExpressionStatement(path.parentPath))
        return;
    
    throw Error(`☝️ Looks like a try to put Statement in place of Expression, use 'match' to filter out such cases: '${print(nodeFrom, PRINT_OPTIONS)} -> ${print(nodeTo, PRINT_OPTIONS)}'. For code: '${path}'`);
}
