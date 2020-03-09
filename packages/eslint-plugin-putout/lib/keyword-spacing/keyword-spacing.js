'use strict';

module.exports.report = () => 'Use spaces around "catch"';

module.exports.fix = ({node, text}) => {
    const {type} = node;
    
    if (type === 'TryStatement')
        return fixCatch(text);
    
    return text;
};

module.exports.include = () => [
    'TryStatement',
];

module.exports.filter = ({node, text}) => {
    const {type} = node;
    
    if (type === 'TryStatement')
        return checkCatch(text);
    
    return false;
};

function checkCatch(text) {
    const before = text.includes('}catch');
    const after = text.includes('catch (');
    const afterOptional = text.includes('catch{');
    
    return before || after || afterOptional;
}

function fixCatch(text) {
    return text
        .replace(/catch{/g, 'catch {')
        .replace(/}catch/g, '} catch')
        .replace(/catch \(/g, 'catch(');
}
