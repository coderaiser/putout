import {generate as babelGenerate} from '@putout/babel';

export const generate = (node, options, sourceMaps) => {
    return babelGenerate(node, {
        comments: false,
        ...options,
    }, sourceMaps);
};
