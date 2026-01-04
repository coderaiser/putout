import {putout} from './putout.js';
import * as exports from './exports.js';

Object.assign(putout, exports);

export default putout;

export {
    putout,
};

export * from './exports.js';

