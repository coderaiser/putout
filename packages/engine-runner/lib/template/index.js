import {tryCatch} from 'try-catch';
import {
    compareAny,
    compareAll,
    parseTemplate,
    isTemplate,
} from '@putout/compare';
import maybeArray from '#maybe-array';
import {createDebug} from '#debug';
import {
    isTime,
    now,
    addCall,
    addMatch,
    addVisit,
    getReportNs,
    markMatch,
} from '#time';

const debug = createDebug('putout:runner:template');

const {entries} = Object;
const isFn = (a) => typeof a === 'function';

const log = (rule, path) => {
    debug.enabled && debug(rule, path.toString());
};

const {stringify} = JSON;

export const _log = log;

const exclude = ({rule, tmpl, fn, nodesExclude}) => {
    if (!isFn(fn) || !nodesExclude.length && !isTime())
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

const wrapWithCheck = ({rule, nodesInclude, nodesExclude, fn}) => {
    const hasChecks = nodesInclude.length > 0 || nodesExclude.length > 0;
    
    if (isTime() && hasChecks)
        markMatch(rule);
    
    return (path) => {
        log(rule, path);
        
        const timed = isTime();
        const reportBefore = timed ? getReportNs(rule) : 0n;
        
        if (timed)
            addCall(rule);
        
        const start = timed ? now() : 0n;
        
        const skip = isSkip({
            path,
            nodesInclude,
            nodesExclude,
        });
        
        const matched = timed ? now() : 0n;
        
        if (timed && hasChecks)
            addMatch(rule, matched - start);
        
        if (skip)
            return;
        
        if (!isFn(fn))
            throw Error(`☝️ Looks like provided visitor is not a function: ${stringify(fn)}. More on using Traverser: https://git.io/JqcMn`);
        
        const [e] = tryCatch(fn, path);
        
        if (timed)
            addVisit(rule, now() - matched, reportBefore);
        
        if (e) {
            e.rule = rule;
            throw e;
        }
    };
};

function isSkip({path, nodesInclude, nodesExclude}) {
    if (nodesExclude.length && compareAny(path, nodesExclude))
        return true;
    
    return nodesInclude.length && !compareAll(path, nodesInclude);
}
