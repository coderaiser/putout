'use strict';

const tryCatch = require('try-catch');
const debug = require('debug')('putout:runner:fix');
const {enabled} = debug;
const {stringify} = JSON;
const isFn = (a) => typeof a === 'function';

const tryToFix = (fix, {path, position, options}) => {
    const [e] = tryCatch(fix, path, {options});
    const {scope} = path.path || path;
    
    if (!e && scope)
        scope.getProgramParent().crawl();
    
    if (!e) {
        return;
    }
    
    e.loc = e.loc || position;
    
    throw e;
};

module.exports = (is, fix, {path, rule, position, options}) => {
    if (!is)
        return;
    
    enabled && debug(`fix: ${rule}`, position, path.toString());
    validate('fix', fix);
    
    tryToFix(fix, {
        path,
        position,
        options,
    });
};

function validate(name, fn) {
    if (!isFn(fn))
        throw Error(`☝️ Looks like '${name}' is not a 'function' but '${typeof fn}' with value: '${stringify(fn)}'. More on writing 🐊Putout Plugins: https://git.io/JqcMn`);
}

