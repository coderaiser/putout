import {
    types,
    operator,
} from 'putout';

const {StringLiteral, ObjectProperty} = types;

const {
    getProperties,
    insertAfter,
    __json,
} = operator;

export const report = () => `Set 'commitType'`;

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        
        const {commitTypePath, mainPath} = getProperties(__aPath, ['commitType', 'main']);
        
        if (commitTypePath)
            return;
        
        if (!mainPath)
            return;
        
        push({
            path,
            mainPath,
        });
    },
});

export const fix = ({mainPath}) => {
    const commitTypeNode = ObjectProperty(StringLiteral('commitType'), StringLiteral('colon'));
    insertAfter(mainPath, commitTypeNode);
};
