'use strict';

const prepare = (plugin, context, options) => (node) => {
    const {filter, report} = plugin;
    
    const source = context.getSourceCode();
    const getText = source.getText.bind(source);
    
    const text = getText(node);
    
    const result = filter({
        text,
        node,
        options,
        getText,
    });
    
    if (!result)
        return;
    
    const fix = prepareFix(plugin.fix, {
        node,
        text,
        getText,
    });
    
    context.report({
        node,
        message: report(node),
        fix,
    });
};

const prepareFix = (fix, {node, text, getText}) => (fixer) => {
    const fixed = fix({
        node,
        text,
        getText,
    });
    
    return [
        fixer.replaceText(node, fixed),
    ];
};

module.exports = (plugin) => {
    const meta = getMeta(plugin);
    
    return {
        meta,
        create(context) {
            const {options} = context;
            const prepared = prepare(plugin, context, options);
            const names = plugin.include({options});
            
            return getTraversers(names, prepared, context);
        },
    };
};

function getMeta(plugin) {
    const {
        type = 'layout',
        category = 'spacing',
        recommended = true,
        fixable = 'whitespace',
    } = plugin;
    
    return {
        type,
        docs: {
            description: plugin.report(),
            category,
            recommended,
        },
        fixable,
    };
}

function getTraversers(names, plugin) {
    const traversers = {};
    
    for (const name of names)
        traversers[name] = plugin;
    
    return traversers;
}

