'use strict';

const description = 'Use spaces around "catch"';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description,
            category: 'spacing',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        return {
            TryStatement: traverse(context),
        };
    },
};

const traverse = (context) => (node) => {
    const text = context
        .getSourceCode()
        .getText(node);
    
    const before = text.includes('}catch');
    const after = text.includes('catch (');
    const afterOptional = text.includes('catch{');
    
    if (!before && !after && !afterOptional)
        return;
    
    context.report({
        node,
        message: description,
        fix: getFix(node, text),
    });
};

const getFix = (node, text) => (fixer) => {
    const fixed = text
        .replace(/catch{/g, 'catch {')
        .replace(/}catch/g, '} catch')
        .replace(/catch \(/g, 'catch(');
    
    return [
        fixer.replaceText(node, fixed),
    ];
};

