'use strict';

const {
    isTryStatement,
    isSwitchStatement,
    isIfStatement,
} = require('putout').types;

module.exports.report = (node) => {
    if (isTryStatement(node))
        return 'Use spaces around "catch"';
    
    if (isSwitchStatement(node))
        return 'Avoid space after "switch"';
    
    if (isIfStatement(node))
        return 'Use space after "if"';
    
    return '';
};

module.exports.fix = ({node, text}) => {
    if (isTryStatement(node))
        return fixCatch(text);
    
    if (isSwitchStatement(node))
        return fixSwitch(text);
    
    return fixIf(text);
};

module.exports.include = () => [
    'TryStatement',
    'SwitchStatement',
    'IfStatement',
];

module.exports.filter = ({node, text}) => {
    if (isTryStatement(node))
        return checkCatch(text);
    
    if (isSwitchStatement(node))
        return checkSwitch(text);
    
    return checkIf(text);
};

function checkCatch(text) {
    const before = text.includes('}catch');
    const after = text.includes('catch (');
    const afterOptional = text.includes('catch{');
    
    return before || after || afterOptional;
}

function checkSwitch(text) {
    return text.includes('switch (');
}

function checkIf(text) {
    return text.includes('if(');
}

function fixCatch(text) {
    return text
        .replace(/catch{/g, 'catch {')
        .replace(/}catch/g, '} catch')
        .replace(/catch \(/g, 'catch(');
}

function fixSwitch(text) {
    return text
        .replace(/switch \(/g, 'switch(');
}

function fixIf(text) {
    return text
        .replace(/if\(/g, 'if (');
}

