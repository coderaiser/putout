import {
    PutoutPlugin,
    Report,
    Include,
    Exclude,
    Filter,
    Fix,
    Replace,
    Match,
    Traverse,
    Traverser,
    Replacer,
    Includer,
} from '../lib/plugin.js';

// PutoutPlugin error tests
function usePlugin(p: PutoutPlugin) {
    return p;
}

// THROWS not assignable to parameter of type 'PutoutPlugin'
usePlugin({});

// Report error tests
function useReport(fn: Report) {
    return fn;
}

// THROWS not assignable to parameter of type 'Report'
useReport({});

// Include error tests
function useInclude(fn: Include) {
    return fn;
}

// THROWS not assignable to parameter of type 'Include'
useInclude({});

// Exclude error tests
function useExclude(fn: Exclude) {
    return fn;
}

// THROWS not assignable to parameter of type 'Exclude'
useExclude({});

// Filter error tests
function useFilter(fn: Filter) {
    return fn;
}

// THROWS not assignable to parameter of type 'Filter'
useFilter({});

// Fix error tests
function useFix(fn: Fix) {
    return fn;
}

// THROWS not assignable to parameter of type 'Fix'
useFix({});

// Replace error tests
function useReplace(fn: Replace) {
    return fn;
}

// THROWS not assignable to parameter of type 'Replace'
useReplace({});

// Match error tests
function useMatch(fn: Match) {
    return fn;
}

// THROWS not assignable to parameter of type 'Match'
useMatch({});

// Traverse error tests
function useTraverse(fn: Traverse) {
    return fn;
}

// THROWS not assignable to parameter of type 'Traverse'
useTraverse({});

// Traverser error tests
function useTraverser(fn: Traverser) {
    return fn;
}

// THROWS not assignable to parameter of type 'Traverser'
useTraverser({});

// Replacer error tests
function useReplacer(fn: Replacer) {
    return fn;
}

// THROWS not assignable to parameter of type 'Replacer'
useReplacer({});

// Includer error tests
function useIncluder(fn: Includer) {
    return fn;
}

// THROWS not assignable to parameter of type 'Includer'
useIncluder({});
