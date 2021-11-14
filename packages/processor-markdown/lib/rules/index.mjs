import {lintRule} from 'unified-lint-rule';
import removeDependenciesStatusBadge from './remove-dependencies-status-badge.mjs';
import removeTrailingWhitespacesFromHeading from './remove-trailing-whitespaces-from-heading.mjs';
import mergeHeadingSpceces from './merge-heading-spaces.mjs';

const plugins = [
    removeDependenciesStatusBadge,
    removeTrailingWhitespacesFromHeading,
    mergeHeadingSpceces,
];

export const run = lintRule('remark-lint:run', (tree, file, options) => {
    for (const {fix, traverse, report, name} of plugins) {
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

export const rules = {
    plugins,
};

