'use strict';

const {types} = require('@putout/babel');
const {
    arrayExpression,
    stringLiteral,
    objectProperty,
} = types;

module.exports.createTypeProperty = (type) => {
    const value = stringLiteral(type);
    return createProperty('type', value);
};

module.exports.createFilesProperty = (files) => {
    const value = arrayExpression(files);
    return createProperty('files', value);
};

module.exports.createFilenameProperty = (filename) => {
    const value = stringLiteral(filename);
    return createProperty('filename', value);
};

module.exports.createContentProperty = (content) => {
    const value = stringLiteral(content);
    return createProperty('content', value);
};

function createProperty(name, value) {
    const key = stringLiteral(name);
    return objectProperty(key, value);
}
