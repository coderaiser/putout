import {declare} from '../lib/declare.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'DeclareOptions'
declare(5);

declare({
    operator: `import {operator} from 'putout'`,
});
