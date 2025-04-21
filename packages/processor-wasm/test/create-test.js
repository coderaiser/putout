import {createTest as createPutoutTest} from '@putout/test';
import {lint} from '../lib/lint.js';

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        extension: 'wast',
        lint,
        ...options,
    });
};
