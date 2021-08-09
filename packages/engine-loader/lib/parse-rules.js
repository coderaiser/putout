'use strict';

const {isArray} = Array;
const isBool = (a) => typeof a === 'boolean';
const isStr = (a) => typeof a === 'string';
const isObj = (a) => typeof a === 'object';
const {entries} = Object;
const {stringify} = JSON;

const notSupportedError = (a) => Error(`Rule format not supported ${a}: ${typeof a}`);
const rulesUsedInsteadOfMatchError = (a) => Error(`Looks like you need to change "rules" to "match" for ${stringify(a)}`);
const defaultOptions = () => Object.create(null);
const parseState = (rule, value) => validateState(rule, value) && value === 'on' || value !== 'off';

module.exports = (rules) => {
    rules = parseSubrules(rules);
    
    const result = [];
    const plugin = null;
    const msg = '';
    
    for (const [rule, value] of entries(rules)) {
        if (isStr(value)) {
            result.push({
                rule,
                state: parseState(rule, value),
                plugin,
                msg,
                options: defaultOptions(),
            });
            continue;
        }
        
        if (isBool(value)) {
            result.push({
                rule,
                state: value,
                plugin,
                msg,
                options: defaultOptions(),
            });
            continue;
        }
        
        const looksLikeArray = isArray(value);
        const looksLikeNormalArray = looksLikeArray && value.length;
        
        if (looksLikeNormalArray) {
            result.push(parseArray(rule, value));
            continue;
        }
        
        if (isObj(value))
            throw rulesUsedInsteadOfMatchError(value);
        
        throw notSupportedError(value);
    }
    
    return result;
};

function parseArray(rule, args) {
    const plugin = null;
    const [rawState] = args;
    
    const state = parseState(rule, rawState);
    
    if (args.length === 3) {
        const [, msg, options] = args;
        
        return {
            rule,
            state,
            plugin,
            msg,
            options,
        };
    }
    
    const [
        ,
        msg = '',
        options = defaultOptions(),
    ] = args;
    
    if (args.length === 2 && !isStr(msg)) {
        return {
            rule,
            state,
            plugin,
            msg: '',
            options: msg,
        };
    }
    
    if (args.length === 1 && isObj(rawState)) {
        return {
            rule,
            state,
            plugin,
            msg,
            options: rawState,
        };
    }
    
    return {
        rule,
        state,
        plugin,
        msg,
        options,
    };
}

function validateState(rule, value) {
    if (isBool(value))
        return true;
    
    if (/^(on|off)$/.test(value))
        return true;
    
    if (isObj(value))
        return true;
    
    throw Error(`${rule}: state option can be "on" or "off" only, when used as string, received: "${value}"`);
}

const cut = (a) => a.split('/')[0];
const isExclude = (a) => a.includes('babel') || a.includes('jscodeshift');

function parseSubrules(rules) {
    const newRules = {};
    
    for (const [rule, value] of entries(rules)) {
        if (!isExclude(rule) && rule.includes('/') && parseState(rule, value))
            newRules[cut(rule)] = 'on';
        
        newRules[rule] = value;
    }
    
    return newRules;
}

