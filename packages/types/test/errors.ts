import {Finder} from '../types';

// THROWS Type '{ report: () => string; }' is not assignable to type 'Finder'.
const finder: Finder = {
    report: () => 'hello',
};

export default finder;
