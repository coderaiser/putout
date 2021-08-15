import {Replacer} from '@putout/types';
debugger;

export const report = () => 'Unexpected "debugger" statement';

export const replace = () => ({
    debugger: '',
});

const removeDebugger: Replacer = {
    report,
    replace,
};

export default removeDebugger;

