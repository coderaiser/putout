import putout from './putout.js';

export {load} from './loader.mjs';
export * from './putout.js';

export default function(...a) {
    return putout(...a);
}

