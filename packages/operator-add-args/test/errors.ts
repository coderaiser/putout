import {addArgs} from '../lib/add-args.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'AddArgsOptions'
addArgs(5);

addArgs({
    compare: ['{compare}', 'test("__a", (__args) => __body)'],
});
