'use strict';

module.exports.report = () => 'Use spaces around "catch"';

module.exports.fix = ({text}) => {
    return text
        .replace(/catch{/g, 'catch {')
        .replace(/}catch/g, '} catch')
        .replace(/catch \(/g, 'catch(');
};

module.exports.include = () => [
    'TryStatement',
];

module.exports.filter = ({text}) => {
    const before = text.includes('}catch');
    const after = text.includes('catch (');
    const afterOptional = text.includes('catch{');
    
    if (!before && !after && !afterOptional)
        return false;
    
    return true;
};

