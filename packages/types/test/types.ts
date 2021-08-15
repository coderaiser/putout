import {Replacer} from '../types';

const replacer: Replacer = {
    report: () => 'hello',
    replace: () => ({
        'const a = 1': 'const b = 2',
    }),
};

export default replacer;
