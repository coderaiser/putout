import {operator} from 'putout';

const {renameFiles} = operator;

export const {
    report,
    fix,
    scan,
} = renameFiles({
    type: 'module',
    mask: '*.mjs',
    rename(name) {
        return name.replace(/mjs$/, 'js');
    },
});
