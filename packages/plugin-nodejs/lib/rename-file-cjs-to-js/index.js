import {operator} from 'putout';

const {renameFiles} = operator;

export const {
    report,
    fix,
    scan,
} = renameFiles({
    type: 'commonjs',
    mask: '*.cjs',
    rename(name) {
        return name.replace(/cjs$/, 'js');
    },
});
