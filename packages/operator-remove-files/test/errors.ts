import {removeFiles} from '../lib/remove-files.js';

// THROWS Expected 0-1 arguments, but got 2
removeFiles('hello', 'world');

// THROWS Argument of type '5' is not assignable to parameter of type 'string | string[] | undefined'
removeFiles(5);
