import {lintRule} from 'unified-lint-rule';
import removeDependenciesStatusBadge from './remove-dependencies-status-badge.mjs';
import removeTrailingWhitespacesFromHeading from './remove-trailing-whitespaces-from-heading.mjs';

const plugins = [
    removeDependenciesStatusBadge,
    removeTrailingWhitespacesFromHeading,
];

const maybeEmptyArray = (a) => isArray(a) ? a : [];

const {isArray} = Array;

export const run = lintRule('remark-lint:run', (tree, file, options) => {
    for (const {fix, traverse, report, name} of plugins) {
        const nodes = traverse(tree);
        
        for (const node of maybeEmptyArray(nodes)) {
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

