import {create} from '#create';

export const files = [
    '.filesystem.json',
];

export const {branch, merge} = create({
    cli: true,
    maybeSimple: true,
});
