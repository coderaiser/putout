import {types} from '@putout/babel';

const {
    arrayExpression,
    stringLiteral,
    objectProperty,
} = types;

export const createTypeProperty = (type) => {
    const value = stringLiteral(type);
    return createProperty('type', value);
};

export const createFilesProperty = (files) => {
    const value = arrayExpression(files);
    return createProperty('files', value);
};

export const createFilenameProperty = (filename) => {
    const value = stringLiteral(filename);
    return createProperty('filename', value);
};

export const createContentProperty = (content) => {
    const value = stringLiteral(content);
    return createProperty('content', value);
};

function createProperty(name, value) {
    const key = stringLiteral(name);
    return objectProperty(key, value);
}
