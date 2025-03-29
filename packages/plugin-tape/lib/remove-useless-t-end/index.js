import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Avoid useless 't.end()'`;

export const fix = (path) => {
    remove(path);
};

const TEST = 'test("__a", (t) => __body)';

export const traverse = ({push}) => ({
    [TEST]: (path) => {
        const paths = [];
        
        operator.traverse(path, {
            't.end()': (path) => {
                paths.push(path);
            },
        });
        
        if (paths.length > 1)
            push(paths.pop());
    },
});
