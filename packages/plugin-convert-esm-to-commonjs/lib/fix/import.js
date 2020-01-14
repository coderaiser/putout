'use strict';

const {
    types,
    operate,
    template,
} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
} = operate;

const {
    isImportSpecifier,
    isImportDefaultSpecifier,
    isImportNamespaceSpecifier,
} = types;

const getName = ({source}) => source.value;

const convert = template(`
    const DECLARATION = require("NAME");
`);

const convertDestructureRename = template(`
    const {
          IMPORTED: LOCAL,
    } = require("NAME");
`);

const convertDestructure = template(`
    const {
          IMPORTED,
    } = require("NAME");
`);

const convertEmpty = template(`
    require("NAME");
`);

module.exports.convertImport = (path) => {
    const {node} = path;
    const {specifiers} = node;
    
    const name = getName(node);
    const vars = [];
    
    if (!specifiers.length)
        return replaceWith(path, convertEmpty({NAME: name}));
    
    for (const spec of specifiers) {
        if (isImportDefaultSpecifier(spec)) {
            vars.push(getImportDefaultVar(name, spec));
            continue;
        }
        
        if (isImportNamespaceSpecifier(spec)) {
            vars.push(getImportDefaultVar(name, spec));
            continue;
        }
        
        if (isImportSpecifier(spec)) {
            vars.push(getImportVar(name, spec));
            continue;
        }
    }
    
    replaceWithMultiple(path, vars);
};

function getImportDefaultVar(name, node) {
    const DECLARATION = node.local;
    const NAME = name;
    
    return convert({
        DECLARATION,
        NAME,
    });
}

function getImportVar(name, node) {
    const {
        local,
        imported,
    } = node;
    
    const IMPORTED = imported;
    const LOCAL = local;
    const NAME = name;
    
    if (IMPORTED.name === LOCAL.name)
        return convertDestructure({
            IMPORTED,
            NAME,
        });
    
    return convertDestructureRename({
        IMPORTED,
        LOCAL,
        NAME,
    });
}

