import {lintRule} from 'unified-lint-rule';

export const run = lintRule('remark-lint:run', (tree, file, options) => {
    for (const {fix, traverse, report, name} of options.plugins) {
        const nodes = [];
        const push = nodes.push.bind(nodes);
        
        traverse(tree, {
            push,
        });
        
        for (const node of nodes) {
            if (options.fix) {
                fix(node, tree);
                continue;
            }
            
            const message = report(node);
            file.message(`putout: ${name}: ${message}`, node);
        }
    }
});
