import {tryCatch} from 'try-catch';
import {
    compareAny,
    compareAll,
    parseTemplate,
    isTemplate,
} from '@putout/compare';
import maybeArray from '../maybe-array.js';
import {createDebug} from '../debug.js';

const debug = createDebug('putout:runner:template');

const {entries} = Object;
const isFn = (a) => typeof a === 'function';

const log = (rule, path) => {
    debug.enabled && debug(rule, path.toString());
};

const {stringify} = JSON;

export const _log = log;

const exclude = ({rule, tmpl, fn, nodesExclude}) => {
    if (!isFn(fn) || !nodesExclude.length)
        return {
            [tmpl]: fn,
        };
    
    const visit = wrapWithCheck({
        rule,
        fn,
        nodesExclude,
        nodesInclude: [],
    });
    
    return {
        [tmpl]: visit,
    };
};

export default ({rule, visitor, options}) => {
    const parsed = [];
    const nodesExclude = maybeArray(options.exclude);
    const nodesInclude = maybeArray(options.include);
    
    for (const [tmpl, fn] of entries(visitor)) {
        if (!tmpl)
            continue;
        
        if (!isTemplate(tmpl)) {
            parsed.push(exclude({
                rule,
                tmpl,
                fn,
                nodesExclude,
            }));
            continue;
        }
        
        const [node, type] = parseTemplate(tmpl);
        
        const visit = wrapWithCheck({
            rule,
            fn,
            nodesExclude,
            nodesInclude: [
                node,
                ...nodesInclude,
            ],
        });
        
        parsed.push({
            [type]: visit,
        });
    }
    
    return parsed;
};

const wrapWithCheck = ({rule, nodesInclude, nodesExclude, fn}) => (path) => {
    log(rule, path);
    
    if (nodesExclude.length && compareAny(path, nodesExclude))
        return;
    
    if (nodesInclude.length && !compareAll(path, nodesInclude))
        return;
    
    if (!isFn(fn))
        throw Error(`☝️ Looks like provided visitor is not a function: ${stringify(fn)}. More on using Traverser: https://git.io/JqcMn`);
    
    const [e] = tryCatch(fn, path);
    
    if (e) {
        e.rule = rule;
        throw e;
    }
};
