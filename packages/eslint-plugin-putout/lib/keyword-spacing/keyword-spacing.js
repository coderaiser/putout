'use strict';

const {
    isTryStatement,
    isSwitchStatement,
} = require('putout').types;

module.exports.report = (node) => {
    if (isTryStatement(node))
        return 'Use spaces around "catch"';
    
    if (isSwitchStatement(node))
        return 'Avoid space after "switch"';
    
    return '';
};

module.exports.fix = ({node, text}) => {
    if (isTryStatement(node))
        return fixCatch(text);
    
    if (isSwitchStatement(node))
        return fixSwitch(text);
    
    return text;
};

module.exports.include = () => [
    'TryStatement',
    'SwitchStatement',
];

module.exports.filter = ({node, text}) => {
    if (isTryStatement(node))
        return checkCatch(text);
    
    if (isSwitchStatement(node))
        return checkSwitch(text);
    
    return false;
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
        .replace(/catch{/g, 'catch {')
        .replace(/}catch/g, '} catch')
        .replace(/catch \(/g, 'catch(');
}

function fixSwitch(text) {
    return text
        .replace(/switch \(/g, 'switch(');
}

