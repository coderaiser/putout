import {operator} from 'putout';

const {renameFiles} = operator;

const {
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

export {
    report,
    fix,
    scan,
};
