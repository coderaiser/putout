'use strict';

const tryCatch = require('try-catch');
const debug = require('debug')('putout:runner:fix');
const {enabled} = debug;
const {stringify} = JSON;

const isFn = (a) => typeof a === 'function';
const getPath = (path) => path.path || path;

const chooseFixArgs = ({path, pathOptions, options}) => {
    if (pathOptions)
        return [
            path,
            pathOptions, {
                options,
            },
        ];
    
    return [
        path, {
            options,
        },
    ];
};

const tryToFix = (fix, {path, pathOptions, position, options}) => {
    const [e] = tryCatch(fix, ...chooseFixArgs({
        path,
        pathOptions,
        options,
    }));
    
    const {scope} = path.path || path;
    
    if (!e && scope)
        scope
            .getProgramParent()
            .crawl();
    
    if (!e)
        return;
    
    e.loc = e.loc || position;
    e.reason = 'fix';
    
    throw e;
};

module.exports = (is, fix, {path, pathOptions, rule, position, options}) => {
    if (!is)
        return;
    
    if (enabled)
        debug(`fix: ${rule}`, position, getPath(path).toString());
    
    validate('fix', fix);
    
    tryToFix(fix, {
        path,
        pathOptions,
        position,
        options,
    });
};

function validate(name, fn) {
    if (!isFn(fn))
        throw Error(`☝️ Looks like '${name}' is not a 'function' but '${typeof fn}' with value: '${stringify(fn)}'. More on writing 🐊Putout Plugins: https://git.io/JqcMn`);
}
