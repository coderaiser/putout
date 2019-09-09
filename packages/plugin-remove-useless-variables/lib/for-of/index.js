'use strict';

const {replaceWith} = require('putout').operate;

module.exports.report = () => `Destructuring should be used in the head of for-of`;

module.exports.fix = ({path, varPath}) => {
    replaceWith(varPath, path.node.id);
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        'for (const __ of __) {}'(path) {
            const leftPath = path.get('left');
            const varPath = leftPath.get('declarations.0.id');
            
            if (!varPath.isIdentifier())
                return;
            
            const {name} = varPath.node;
            
            const {
                references,
                referencePaths,
            } = varPath.scope.bindings[name];
            
            if (references !== 1)
                return;
            
            const [referencePath] = referencePaths;
            const {parentPath} = referencePath;
            const isSameName = parentPath
                .get('init')
                .isIdentifier({name});
            
            if (!isSameName)
                return;
            
            push({
                path: parentPath,
                varPath,
            });
        },
    };
};

