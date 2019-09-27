'use strict';

const {isArray} = Array;
const isBool = (a) => typeof a === 'boolean';
const isStr = (a) => typeof a === 'string';
const isObj = (a) => typeof a === 'object';
const {entries} = Object;

const notSupportedError = (a) => Error(`Rule format not supported ${a}: ${typeof a}`);
const defaultOptions = () => Object.create(null);
const parseState = (a) => validateState(a) && a === 'on' || a !== 'off';

module.exports = (rules) => {
    const result = [];
    
    const plugin = null;
    const msg = '';
    
    for (const [rule, value] of entries(rules)) {
        if (isStr(value)) {
            result.push({
                rule,
                state: parseState(value),
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
        
        throw notSupportedError(value);
    }
    
    return result;
};

function parseArray(rule, args) {
    const plugin = null;
    const [rawState] = args;
    
    const state = parseState(rawState);
    
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

function validateState(a) {
    if (isBool(a))
        return true;
    
    if (/^(on|off)$/.test(a))
        return true;
    
    if (isObj(a))
        return true;
    
    if (typeof a === 'string')
        return true;
    
    throw Error(`state option can be "on" or "off" only, when used as string, received: ${a}`);
}

