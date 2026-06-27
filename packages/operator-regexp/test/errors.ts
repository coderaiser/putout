import {
    isSimpleRegExp,
    getStringFromRegExp,
    transformRegExp,
} from '../lib/regexp.js';

const noop = () => {};
// THROWS Argument of type 'number' is not assignable to parameter of type 'RegExp'
isSimpleRegExp(5);
// THROWS Expected 1 arguments, but got 0
isSimpleRegExp();
// THROWS Argument of type 'number' is not assignable to parameter of type '{ pattern: string; }'
getStringFromRegExp(5);
// THROWS Expected 1 arguments, but got 0
getStringFromRegExp();
// THROWS Expected 2 arguments, but got 0
transformRegExp();
// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
transformRegExp(5, {
    report: () => '',
    fix: noop,
    traverse: ({push}) => ({
        RegExp(path) {
            push(path);
        },
    }),
});
