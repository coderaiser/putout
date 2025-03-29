import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => 'Remove "test.skip"';

export const replace = () => ({
    '__a.skip(__b, __c)': '__a(__b, __c)',
    '__a.skip(__b, __c, __d)': '__a(__b, __c, __d)',
});

export const filter = (path) => {
    return isIdentifier(path.node.callee.object, {
        name: 'test',
    });
};
