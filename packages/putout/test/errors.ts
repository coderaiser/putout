import putout, {
    parse,
    print,
    traverse,
    putoutAsync,
    template,
    generate,
    operator,
} from '../lib/index.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
parse(5);
// THROWS Expected 2-6 arguments, but got
traverse('hello');
// THROWS Expected 2 arguments, but got 1
putout(3);
// THROWS Argument of type 'string' is not assignable to parameter of type 'File'
print('hello');
// THROWS Expected 2 arguments, but got 1
putoutAsync(5);
// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
template(5);
// THROWS Argument of type 'string' is not assignable to parameter of type 'Node'
generate('hello');

const {replaceWith} = operator;

// THROWS Expected 2 arguments, but got 1.
replaceWith(1);
