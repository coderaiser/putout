import {
    convertCssToJs,
    convertJsToCss,
} from '../lib/css.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
convertCssToJs(5);
//
// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
convertJsToCss(5);
