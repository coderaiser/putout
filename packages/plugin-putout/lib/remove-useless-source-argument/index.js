import {types} from 'putout';

const {isObjectProperty} = types;

export const report = () => `Avoid useless 'source' argument`;

export const filter = (path) => !isObjectProperty(path.parentPath);

export const replace = () => ({
    'findPlaces(__a, __b, __c)': 'findPlaces(__a, __c)',
    'transform(__a, __b, __c)': 'transform(__a, __c)',
    'tryCatch(transform, __a, __b, __c)': 'tryCatch(transform, __a, __c)',
    'tryCatch(findPlaces, __a, __b, __c)': 'tryCatch(findPlaces, __a, __c)',
});
