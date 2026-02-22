import {tryCatch} from 'try-catch';
import {createDebug} from './debug.js';

const {stringify} = JSON;

const isFn = (a) => typeof a === 'function';
const getPath = (path) => path.path || path;
const debug = createDebug('putout:runner:fix');

const chooseFixArgs = ({path, pathOptions, options}) => [
    path, {
        options,
        ...pathOptions,
    },
];

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

export default (is, fix, {path, pathOptions, rule, position, options}) => {
    if (!is)
        return;
    
    if (debug.enabled)
        debug(`${rule}:`, position, getPath(path).toString());
    
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
