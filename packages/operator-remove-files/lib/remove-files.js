import {removeFile, getFilename} from '@putout/operator-filesystem';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const applyDiff = (a, b) => Array.from(new Set(a).difference(new Set(b)));

const report = (file) => `Remove files: '${getFilename(file)}'`;

const fix = (file) => {
    removeFile(file);
};

export const removeFiles = (defaultNames) => ({
    report,
    fix,
    scan: createScan(defaultNames),
});

const createScan = (defaultNames = []) => (path, {push, trackFile, options}) => {
    const {names, dismiss} = options;
    const allNames = [
        maybeArray(defaultNames),
        maybeArray(names),
    ]
        .flat()
        .filter(Boolean);
    
    if (!allNames.length)
        return;
    
    const namesDiff = applyDiff(allNames, dismiss);
    
    for (const file of trackFile(path, namesDiff)) {
        push(file, {
            names: allNames,
        });
    }
};
