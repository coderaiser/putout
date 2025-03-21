import {operator, types} from 'putout';

const {isForOfStatement} = types;
const {remove, replaceWith} = operator;

export const report = () => `Convert 'progress()' to 'trackFile()'`;

export const fix = ({path, statement}) => {
    const {name} = statement.node.right.callee.object;
    const nameBinding = path.scope.getAllBindings()[name];
    const {init} = nameBinding.path.node;
    
    init.callee.name = 'trackFile';
    
    replaceWith(statement.get('right'), init);
    const id = statement.get('left.declarations.0.id');
    
    replaceWith(id, id.get('elements.1'));
    
    remove(path);
};

export const traverse = ({push}) => ({
    'progress(__args)': (path) => {
        const statement = path.find(isForOfStatement);
        
        if (!statement)
            return;
        
        const forOfCount = statement.parentPath
            .get('body')
            .filter(isForOfStatement)
            .length;
        
        if (forOfCount > 1)
            return;
        
        push({
            path,
            statement,
        });
    },
});
