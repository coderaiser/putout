import * as removeDependenciesStatusBadge from './remove-dependencies-status-badge/index.js';
import * as splitLinkWithTitle from './split-link-with-title/index.js';
import * as mergeHeadingSpaces from './merge-heading-spaces/index.js';

export const rules = {
    'merge-heading-spaces': mergeHeadingSpaces,
    'split-link-with-title': splitLinkWithTitle,
    'remove-dependencies-status-badge': removeDependenciesStatusBadge,
};
