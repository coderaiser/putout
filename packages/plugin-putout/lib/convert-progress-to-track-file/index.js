'use strict';

const {operator, types} = require('putout');

const {isForOfStatement} = types;
const {remove, replaceWith} = operator;

module.exports.report = () => `Convert 'progress()' to 'trackFile()'`;

module.exports.fix = ({path, statement}) => {
    const {name} = statement.node.right.callee.object;
    const nameBinding = path.scope.getAllBindings()[name];
    const {init} = nameBinding.path.node;
    
    init.callee.name = 'trackFile';
    
    replaceWith(statement.get('right'), init);
    const id = statement.get('left.declarations.0.id');
    
    replaceWith(id, id.get('elements.1'));
    
    remove(path);
};

module.exports.traverse = ({push}) => ({
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
