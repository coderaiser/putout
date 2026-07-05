import {
    wrapInNamespace,
    unwrapNamespace,
} from '../lib/wasm.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
wrapInNamespace(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
unwrapNamespace(5);
