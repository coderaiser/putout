import {operator} from 'putout';

const {superTraverse} = operator;
const {traverse} = operator;
const {__markdown} = operator;

module.exports.traverse = () => ({
    [__markdown]: (path) => {
        superTraverse(path, {
            '__a(__b, __c)': (path) => {},
        });
    },
});
