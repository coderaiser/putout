'use strict';

const {
    isFunctionDeclaration,
    isVariableDeclaration,
    isClassDeclaration,
    functionExpression,
    classExpression,
} = require('putout').types;

const {template} = require('putout');

const {assign} = Object;

const getVarName = ([declaration]) => declaration.id.name;
const getVarValue = ([declaration]) => declaration.init;

module.exports.convertNamedExport = (path) => {
    const {declaration} = path.node;
    const convert = template(`
        module.exports.NAME = DECLARATION;
    `);
    
    const DECLARATION = getDeclaration(declaration);
    const NAME = getName(declaration);
    
    path.replaceWith(convert({
        NAME,
        DECLARATION,
    }));
};

module.exports.convertDefaultExport = (path) => {
    const {declaration} = path.node;
    const convert = template(`
        module.exports = DECLARATION;
    `);
    
    const DECLARATION = getDeclaration(declaration);
    
    path.replaceWith(convert({
        DECLARATION,
    }));
};

function getName(node) {
    if (isFunctionDeclaration(node))
        return node.id.name;
    
    if (isVariableDeclaration(node))
        return getVarName(node.declarations);
    
    if (isClassDeclaration(node))
        return node.id.name;
}

function getDeclaration(node) {
    if (isFunctionDeclaration(node))
        return convertFnDeclarationToExpression(node);
    
    if (isVariableDeclaration(node))
        return getVarValue(node.declarations);
    
    if (isClassDeclaration(node))
        return convertClassDeclarationToExpression(node);
    
    return node;
}

function convertFnDeclarationToExpression(node) {
    const {
        id,
        params,
        body,
        generator,
        async,
        loc,
    } = node;
    
    const declaration = functionExpression(id, params, body, generator, async);
    
    return assign(declaration, {
        loc,
    });
}

function convertClassDeclarationToExpression(node) {
    const {
        id,
        superClass,
        body,
        loc,
    } = node;
    
    const declaration = classExpression(id, superClass, body);
    
    return assign(declaration, {
        loc,
    });
}

