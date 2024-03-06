import {branch, merge} from '@putout/processor-json';
import putout from '../putout.js';

export const lintJSON = (rawSource, options) => {
    const list = branch(rawSource);
    const {source} = list[0];
    const {code} = putout(source, options);
    
    return merge(rawSource, [code]);
};
