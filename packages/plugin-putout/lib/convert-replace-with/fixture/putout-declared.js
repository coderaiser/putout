'use strict';

const {
    types,
} = require('putout');

module.exports.fix = ({lintPath}) => {
    lintPath.parentPath.replaceWith(TemplateLiteral([node], []));
};

