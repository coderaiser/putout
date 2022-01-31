'use strict';

module.exports.report = (path) => {
    return `Should be used camelCase instead of PascalCase in functions ${path.node.name}`;
};

module.exports.fix = (path) => {
    const {name} = path.node;
    const camel = toCamel(name);
    
    path.node.name = camel;
    path.scope.rename(name, toCamel(name));
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ClassProperty: checkBig('key', push),
        ClassMethod: checkBig('key', push),
        FunctionDeclaration: checkBig('id', push),
        
        FunctionExpression(path) {
            const idPath = path.get('id');
            
            if (!isBig(idPath))
                return;
            
            push(idPath);
        },
        
        VariableDeclarator(path) {
            let isJSX = false;
            const idPath = path.get('id');
            const initPath = path.get('init');
            
            if (!isBig(idPath))
                return;
            
            path.traverse({
                JSXElement(path) {
                    isJSX = true;
                    path.stop();
                },
            });
            
            if (isJSX)
                return;
            
            if (initPath.isArrowFunctionExpression())
                return push(idPath);
            
            if (initPath.isFunctionExpression())
                return push(idPath);
        },
    });
};

function toCamel(name) {
    const newName = name.slice(1);
    const [a] = name;
    const b = a.toLowerCase();
    
    return `${b}${newName}`;
}

function isBig({node}) {
    if (!node)
        return false;
    
    if (!node.name)
        return false;
    
    return /[A-Z]/.test(node.name[0]);
}

function checkBig(query, push) {
    return (path) => {
        const keyPath = path.get(query);
        
        if (!isBig(keyPath))
            return;
        
        push(keyPath);
    };
}

