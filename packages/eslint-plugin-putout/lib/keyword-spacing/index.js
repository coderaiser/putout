'use strict';

const {
    isTryStatement,
    isSwitchStatement,
} = require('putout').types;

const keywords = {
    IfStatement: 'if',
    ForStatement: 'for',
    ForOfStatement: 'for',
    ForOfStatement_: 'for await',
};

const checkNodeSpace = ({text, node}) => {
    const {type} = node;
    const key = keywords[type];
    const key_ = keywords[`${type}_`];
    
    if (text.includes(`${key}(`))
        return true;
    
    if (key_ && text.includes(`${key_}(`))
        return true;
    
    return false;
};

const fixNodeSpace = ({node, text}) => {
    const {type} = node;
    const key = keywords[type];
    
    return text
        .replace(`${key}(`, `${key} (`)
        .replace(`for await(`, `for await (`);
};

module.exports.report = (node) => {
    if (isTryStatement(node))
        return 'Use spaces around "catch"';
    
    if (isSwitchStatement(node))
        return 'Avoid space after "switch"';
    
    return `Use space after "${keywords[node.type]}"`;
};

module.exports.fix = ({node, text}) => {
    if (isTryStatement(node))
        return fixCatch(text);
    
    if (isSwitchStatement(node))
        return fixSwitch(text);
    
    return fixNodeSpace({node, text});
};

module.exports.include = () => [
    'TryStatement',
    'SwitchStatement',
    'IfStatement',
    'ForStatement',
    'ForOfStatement',
];

module.exports.filter = ({node, text}) => {
    if (isTryStatement(node))
        return checkCatch(text);
    
    if (isSwitchStatement(node))
        return checkSwitch(text);
    
    return checkNodeSpace({node, text});
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

function fixCatch(text) {
    return text
        .replaceAll('catch{', 'catch {')
        .replaceAll('}catch', '} catch')
        .replaceAll('catch (', 'catch(');
}

function fixSwitch(text) {
    return text
        .replaceAll('switch (', 'switch(');
}

