import putout, {
    parse,
    print,
    traverse,
} from '../lib/index.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parse(5);
// THROWS Expected 2-6 arguments, but got
traverse('hello');
// THROWS Expected 2 arguments, but got 1
putout(3);
// THROWS Argument of type 'string' is not assignable to parameter of type 'File'
print('hello');
