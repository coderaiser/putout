import {getTime as _getTime} from '@putout/engine-runner/time';
import {getAnomalies} from './time-threshold.js';

const isUndefined = (a) => typeof a === 'undefined';

const SIMPLE = /^[A-Za-z0-9_][A-Za-z0-9_\-/.]*$/;
const TIME_FIELDS = [
    'setup',
    'match',
    'visit',
    'report',
    'find',
];

const HIDDEN = new Set([
    'setup',
    'report',
    'find',
]);

const sec = (a) => `${a.toFixed(3)}s`;
const key = (name) => SIMPLE.test(name) ? name : JSON.stringify(name);
const identity = (a) => a;

export const formatTime = ({files, traverse, rules, passes}, overrides = {}) => {
    const {
        mode = 'on',
        paint = identity,
    } = overrides;
    
    const isAll = mode === 'all';
    let sum = 0;
    
    for (const {total} of rules)
        sum += total;
    
    const lines = [
        'time:',
        `  files: ${files}`,
        `  traverse: ${sec(traverse)}`,
        `  rules: ${sec(sum)}`,
    ];
    
    const {thresholds, flags} = getAnomalies(rules);
    const shown = [];
    
    for (const [i, rule] of rules.entries()) {
        if (isAll || flags[i].size)
            shown.push([rule, flags[i]]);
    }
    
    if (!isAll) {
        const list = [];
        
        for (const field of TIME_FIELDS) {
            const threshold = thresholds[field];
            list.push(`${field} ${threshold === null ? '-' : sec(threshold)}`);
        }
        
        lines.push(`anomalies: ${shown.length} of ${rules.length} rules`, `thresholds: ${list.join(', ')}`);
    }
    
    lines.push(shown.length ? 'rules:' : 'rules: {}');
    
    for (const [rule, flag] of shown) {
        lines.push(`  ${key(rule.rule)}[${rule.type}]:`, `    total: ${sec(rule.total)}`);
        
        for (const field of TIME_FIELDS) {
            if (isUndefined(rule[field]))
                continue;
            
            const isAnomaly = !isAll && flag.has(field);
            
            if (!isAll && HIDDEN.has(field) && !isAnomaly)
                continue;
            
            const tag = isAnomaly ? ` ${paint('[anomaly]')}` : '';
            lines.push(`    ${field}: ${sec(rule[field])}${tag}`);
        }
        
        lines.push(`    calls: ${rule.calls}`, `    hits: ${rule.hits}`);
    }
    
    lines.push(passes.length ? 'passes:' : 'passes: []');
    
    for (const item of passes)
        lines.push(`  - pass: ${item.pass}`, `    runs: ${item.runs}`, `    total: ${sec(item.total)}`);
    
    return `${lines.join('\n')}\n`;
};

const two = (a) => String(a).padStart(2, '0');

const getName = (date, pid) => {
    const day = [
        date.getFullYear(),
        two(date.getMonth() + 1),
        two(date.getDate()),
    ].join('-');
    
    const time = [
        two(date.getHours()),
        two(date.getMinutes()),
        two(date.getSeconds()),
    ].join('-');
    
    return `.putout-time-${day}-${time}-${pid}.json`;
};

export const printTime = async ({log, writeFile, mode, paint, date, pid, getTime = _getTime}) => {
    const time = getTime();
    
    if (mode === 'file') {
        const name = getName(date, pid);
        const data = {
            unit: 's',
            ...time,
        };
        
        await writeFile(name, JSON.stringify(data, null, 4));
        log(name);
        
        return;
    }
    
    log(formatTime(time, {
        mode,
        paint,
    }));
};
