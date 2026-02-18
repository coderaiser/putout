import {removeFile, getFilename} from '@putout/operator-filesystem';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const diff = (a, b) => new Set(a).difference(new Set(b));

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
    ];
    
    const flatNames = allNames
        .flat()
        .filter(Boolean);
    
    if (!flatNames.length)
        return;
    
    for (const file of trackFile(path, diff(flatNames, dismiss))) {
        push(file, {
            names: allNames,
        });
    }
};
