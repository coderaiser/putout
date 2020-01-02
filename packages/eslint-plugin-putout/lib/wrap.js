'use strict';

const prepare = (plugin, context, options) => (node) => {
    const {filter, report} = plugin;
    
    const text = context
        .getSourceCode()
        .getText(node);
    
    const result = filter({
        text,
        node,
        options,
    });
    
    if (!result)
        return;
    
    const fix = prepareFix(plugin.fix, {
        node,
        text,
    });
    
    context.report({
        node,
        message: report(node),
        fix,
    });
};

const prepareFix = (fix, {node, text}) => (fixer) => {
    const fixed = fix({
        node,
        text,
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

