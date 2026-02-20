import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['path', {
        include: [
            'export const filter = () => __body',
            'module.exports.filter = () => __body',
        ],
    }],
});
