import {types} from 'putout';

const {isBlockStatement} = types;

export const report = () => `Use 'noop()'`;

export const exclude = () => [
    'const __a = () => {}',
];

export const match = () => ({
    '() => __body': ({__body}) => {
        return isBlockStatement(__body) && !__body.body.length;
    },
});

export const replace = () => ({
    '() => __body': 'noop',
});
