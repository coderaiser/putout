'use strict';

const {types} = require('putout');

const {replaceWith} = require('putout').operator;

module.exports.fix = ({lintPath}) => {
    replaceWith(lintPath.parentPath, TemplateLiteral([node], []));
};
