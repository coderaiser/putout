import {operator} from 'putout';

const {renameFiles} = operator;
const {
    report,
    fix,
    scan,
} = renameFiles({
    type: 'commonjs',
    mask: '*.cts',
    rename(name) {
        return name.replace(/cts$/, 'ts');
    },
});

export {
    report,
    fix,
    scan,
};
