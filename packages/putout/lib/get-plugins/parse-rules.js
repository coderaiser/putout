'use strict';

const {isArray} = Array;
const isBool = (a) => typeof a === 'boolean';
const isStr = (a) => typeof a === 'string';
const {entries} = Object;

const notSupportedError = (a) => Error(`Rule format not supported ${a}: ${typeof a}`);
const defaultOptions = () => Object.create(null);

module.exports = (rules) => {
    const result = [];
    
    const plugin = null;
    const msg = '';
    
    for (const [rule, value] of entries(rules)) {
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
    
    if (args.length === 3) {
        const [state, msg, options] = args;
        
        return {
            rule,
            state,
            plugin,
            msg,
            options,
        };
    }
    
    const [
        state,
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
    
    return {
        rule,
        state,
        plugin,
        msg,
        options,
    };
}

