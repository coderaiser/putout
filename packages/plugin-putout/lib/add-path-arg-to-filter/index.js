import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['path', {
        include: [
            'export const filter = () => __',
            'module.exports.filter = () => __',
        ],
    }],
});
