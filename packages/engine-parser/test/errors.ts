import {
    parse,
    print,
    generate,
    template,
} from '../lib/parser.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parse(5);

// THROWS Argument of type 'string' is not assignable to parameter of type 'Node'
print('hello');

// THROWS Argument of type 'string' is not assignable to parameter of type 'Node'
generate('hello');

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
template(5);
