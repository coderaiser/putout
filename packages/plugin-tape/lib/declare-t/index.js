'use strict';

const {types} = require('putout');
const {Identifier} = types;

module.exports.report = () => 'Argument "t" is missing';

module.exports.fix = (path) => {
    path.scope.block.params = [Identifier('t')];
};

module.exports.traverse = ({push}) => ({
    't.end()': (path) => {
        if (path.scope.hasBinding('t'))
            return;
        
        push(path);
    },
});
