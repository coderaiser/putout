import {removeFile, getFilename} from '@putout/operator-filesystem';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

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
    const {names} = options;
    const allNames = [
        maybeArray(defaultNames),
        maybeArray(names),
    ]
        .flat()
        .filter(Boolean);
    
    if (!allNames.length)
        return;
    
    for (const file of trackFile(path, allNames)) {
        push(file, {
            names: allNames,
        });
    }
};
