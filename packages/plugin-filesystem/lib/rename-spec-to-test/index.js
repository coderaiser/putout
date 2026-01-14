import {operator} from 'putout';

const {renameFiles} = operator;

export const {
    report,
    fix,
    scan,
} = renameFiles({
    mask: '*.spec.*',
    from: 'spec',
    to: 'test',
});
