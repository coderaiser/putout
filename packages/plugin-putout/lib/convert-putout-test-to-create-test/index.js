import {operator} from 'putout';

const {rename} = operator;
const {assign} = Object;

export const report = () => `Use 'createTest' instead of 'putoutTest'`;
export const filter = ({scope}) => !scope.bindings.createTest;

export const include = () => [
    'import putoutTest from "@putout/test"',
];

export const fix = (path) => {
    const [first] = path.node.specifiers;
    
    assign(first, {
        type: 'ImportSpecifier',
        kind: 'value',
        imported: first.local,
    });
    
    rename(path, 'putoutTest', 'createTest');
};
