import {operator} from 'putout';

const {renameFiles} = operator;

export const {
    report,
    fix,
    scan,
} = renameFiles({
    from: 'madrun.js',
    to: '.madrun.js',
    near: 'package.json',
});
