import {operator} from 'putout';

const {remove} = operator;

export const fix = (path) => {
    remove(path);
};

module.exports.fix = (path) => {
    remove(path);
};
