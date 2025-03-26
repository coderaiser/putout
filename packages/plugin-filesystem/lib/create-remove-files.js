import {operator} from 'putout';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const {removeFile, getFilename} = operator;

const report = (file, {names}) => `Remove '${names}': '${getFilename(file)}'`;

const fix = (file) => {
    removeFile(file);
};

export const createRemoveFiles = (defaultNames) => ({
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
