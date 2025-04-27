import {operator} from 'putout';

const {renameFiles} = operator;

export const {
    report,
    fix,
    scan,
} = renameFiles({
    type: 'module',
    mask: '*.mts',
    rename(name) {
        return name.replace(/mts$/, 'ts');
    },
});
