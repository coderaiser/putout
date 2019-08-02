'use strict';

const {types} = require('putout');

const {isStringLiteral} = types;

module.exports.report = () => `Suffix "legacy" should be avoided`;

module.exports.fix = ({nameNode}) => {
    nameNode.value = nameNode.value.replace('/legacy', '');
};

module.exports.traverse = ({push}) => {
    return {
        VariableDeclarator(path) {
            const initPath = path.get('init');
            
            if (!initPath.isCallExpression())
                return;
            
            const [nameNode] = initPath.node.arguments;
            
            if (!isStringLiteral(nameNode))
                return;
            
            if (!nameNode.value.includes('/legacy'))
                return;
            
            push({
                path: initPath,
                nameNode,
            });
        },
    };
};

