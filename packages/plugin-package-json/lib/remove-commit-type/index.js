import {operator} from 'putout';

const {
    getProperties,
    remove,
    __json,
} = operator;

export const report = () => `Remove 'commitType=colon' field of 'package.json', it is 'colon' by default`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {commitTypePath} = getProperties(__aPath, ['commitType']);
        
        if (!commitTypePath)
            return;
        
        if (commitTypePath.get('value').isStringLiteral({value: 'paren'}))
            return;
        
        push(commitTypePath);
    },
});
