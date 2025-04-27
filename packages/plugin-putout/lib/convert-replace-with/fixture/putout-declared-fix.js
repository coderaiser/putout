'use strict';

const {types} = require('putout');

module.exports.fix = ({lintPath}) => {
    replaceWith(lintPath.parentPath, TemplateLiteral([node], []));
};
