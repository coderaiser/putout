import {ignore, fix} from '../lib/ignore.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'IgnoreOptions'
ignore(5);

ignore({
    name: '.npmignore',
    // THROWS Type 'string' is not assignable to type 'string[]'.
    list: 'hello',
});

// THROWS Argument of type 'number' is not assignable to parameter of type
fix(5);
