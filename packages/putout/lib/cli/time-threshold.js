const FIELDS = [
    'setup',
    'match',
    'visit',
    'report',
    'find',
];

// Otsu method: split the values in two groups,
// so that the variance between the groups is the largest.
export const getThreshold = (values) => {
    const n = values.length;
    
    if (n < 3)
        return null;
    
    const sorted = values.toSorted((a, b) => b - a);
    
    if (sorted[0] === sorted[n - 1])
        return null;
    
    let total = 0;
    
    for (const value of sorted) {
        total += value;
    }
    
    let best = {
        variance: -1,
        k: 0,
    };
    
    let head = 0;
    
    for (let k = 1; k < n; k++) {
        head += sorted[k - 1];
        
        if (sorted[k - 1] === sorted[k])
            continue;
        
        const mean1 = head / k;
        const mean2 = (total - head) / (n - k);
        const variance = k / n * ((n - k) / n) * (mean1 - mean2) ** 2;
        
        if (variance > best.variance)
            best = {
                variance,
                k,
            };
    }
    
    if (best.k > n / 2)
        return null;
    
    return sorted[best.k - 1];
};

export const getAnomalies = (rules) => {
    const thresholds = {};
    
    for (const field of FIELDS) {
        const values = rules
            .filter((rule) => rule[field] !== undefined)
            .map((rule) => rule[field]);
        
        thresholds[field] = getThreshold(values);
    }
    
    const flags = [];
    
    for (const rule of rules) {
        const set = new Set();
        
        for (const field of FIELDS) {
            const threshold = thresholds[field];
            
            if (threshold !== null && rule[field] >= threshold)
                set.add(field);
        }
        
        flags.push(set);
    }
    
    return {
        thresholds,
        flags,
    };
};
