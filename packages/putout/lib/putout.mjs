import putout from './putout.js';

export {transformSource} from './loader.mjs';
export * from './putout.js';

export default function(...a) {
    return putout(...a);
}

