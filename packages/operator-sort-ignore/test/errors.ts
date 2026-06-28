import {sortIgnore} from '../lib/sort-ignore.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'SortIgnoreOptions'
sortIgnore(5);

sortIgnore({
    name: '.npmignore',
    // THROWS Type 'number' is not assignable to type 'string'
    property: 5,
});
