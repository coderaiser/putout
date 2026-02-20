import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['path', {
        include: [
            'export const fix = () => __body',
            'export const fix = () => path.__(__args)',
            'module.exports.fix = () => __body',
            'module.exports.fix = () => path.__(__args)',
        ],
    }],
});
