import {operator} from 'putout';

const {renameFile, getFilename} = operator;

const report = (path, {mask, from, to}) => {
    if (!mask)
        return `Rename '${from}' to '${to}'`;
    
    return `Rename '${mask}' to '${mask.replace(from, to)}'`;
};

export const renameFileByMask = ({mask, from, to} = {}) => {
    return {
        fix,
        report,
        scan: createScan({
            mask,
            from,
            to,
        }),
    };
};

function fix(path, {from, to}) {
    const filename = getFilename(path);
    const newFilename = filename.replace(from, to);
    
    renameFile(path, newFilename);
}

const createScan = (baseOptions) => (rootPath, {push, options, trackFile}) => {
    const from = options.from || baseOptions.from;
    const to = options.to || baseOptions.to;
    const mask = options.mask || baseOptions.mask;
    
    if (!from || !to)
        return {};
    
    for (const file of trackFile(rootPath, mask || from)) {
        push(file, {
            from,
            to,
            mask,
        });
    }
};
