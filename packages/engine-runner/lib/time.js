import process, {hrtime} from 'node:process';

const isUndefined = (a) => typeof a === 'undefined';

const OFF = new Set([
    '',
    '0',
    'false',
]);

export const parseTime = (value) => {
    if (isUndefined(value) || OFF.has(value))
        return 'off';
    
    if (value === 'all' || value === 'file')
        return value;
    
    return 'on';
};

let enabled = parseTime(process.env.PUTOUT_TIME) !== 'off';
let rules = new Map();
let passes = [];
let traverseNs = 0n;
let files = 0;

const createEntry = () => ({
    type: 'unknown',
    visit: 0n,
    report: 0n,
    calls: 0,
    hits: 0,
});

const getEntry = (rule) => {
    if (!rules.has(rule))
        rules.set(rule, createEntry());
    
    return rules.get(rule);
};

const add = (rule, key, ns) => {
    const entry = getEntry(rule);
    
    entry[key] = (entry[key] || 0n) + ns;
};

export const isTime = () => enabled;

export const setTime = (value) => {
    enabled = Boolean(value);
};

export const now = () => hrtime.bigint();

export const setType = (rule, type) => {
    const entry = getEntry(rule);
    
    entry.type = type;
    
    const key = type === 'finder' ? 'find' : 'setup';
    
    entry[key] = entry[key] || 0n;
};

export const markMatch = (rule) => {
    const entry = getEntry(rule);
    
    entry.match = entry.match || 0n;
};

export const addSetup = (rule, ns) => {
    add(rule, 'setup', ns);
};

export const addMatch = (rule, ns) => {
    add(rule, 'match', ns);
};

export const addCall = (rule) => {
    ++getEntry(rule).calls;
};

// `report` time (report + fix) happens inside a visit,
// so it is subtracted from `visit` to keep the numbers exclusive.
export const addVisit = (rule, ns, reportBefore) => {
    const entry = getEntry(rule);
    
    entry.visit += ns - (entry.report - reportBefore);
    ++entry.hits;
};

export const addReport = (rule, ns) => {
    add(rule, 'report', ns);
};

export const getReportNs = (rule) => rules.get(rule)?.report || 0n;

export const getInnerNs = (rule) => {
    const entry = rules.get(rule);
    
    if (!entry)
        return 0n;
    
    return (entry.match || 0n) + entry.visit;
};

// A finder runs its own traversal. Its callbacks are counted in
// `match` and `visit`, so only the rest is the time of the finder.
export const addFind = (rule, elapsedNs, before) => {
    const rest = elapsedNs - (getInnerNs(rule) - before);
    
    add(rule, 'find', rest > 0n ? rest : 0n);
};

export const addTraverse = (ns) => {
    traverseNs += ns;
};

export const addPass = (pass, ns) => {
    const item = passes[pass] || {
        pass: pass + 1,
        runs: 0,
        ns: 0n,
    };
    
    ++item.runs;
    item.ns += ns;
    passes[pass] = item;
};

export const addFile = () => {
    ++files;
};

const toSeconds = (ns) => Number(ns) / 1e9;

const TIME_KEYS = [
    'setup',
    'match',
    'visit',
    'report',
    'find',
];

const convert = (rule, entry) => {
    const result = {
        rule,
        type: entry.type,
        total: 0,
    };
    
    let total = 0n;
    
    for (const key of TIME_KEYS) {
        if (isUndefined(entry[key]))
            continue;
        
        total += entry[key];
        result[key] = toSeconds(entry[key]);
    }
    
    result.total = toSeconds(total);
    result.calls = entry.calls;
    result.hits = entry.hits;
    
    return result;
};

export const getTime = () => {
    const list = [];
    
    for (const [rule, entry] of rules)
        list.push(convert(rule, entry));
    
    list.sort((a, b) => b.total - a.total);
    
    return {
        files,
        traverse: toSeconds(traverseNs),
        rules: list,
        passes: passes
            .filter(Boolean)
            .map(({pass, runs, ns}) => ({
                pass,
                runs,
                total: toSeconds(ns),
            })),
    };
};

export const resetTime = () => {
    rules = new Map();
    passes = [];
    traverseNs = 0n;
    files = 0;
};
