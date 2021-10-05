'use strict';

const {types} = require('putout');

const {
    Identifier,
    ObjectPattern,
    ObjectProperty,
} = types;

module.exports.report = () => 'Argument "comparePlaces" is missing';

module.exports.fix = (path) => {
    const id = Identifier('comparePlaces');
    path.scope.block.params = [
        ObjectPattern([ObjectProperty(id, id)]),
    ];
};

module.exports.traverse = ({push}) => ({
    ReferencedIdentifier(path) {
        if (path.node.name !== 'comparePlaces')
            return;
        
        if (path.scope.hasBinding('comparePlaces'))
            return;
        
        push(path);
    },
});
