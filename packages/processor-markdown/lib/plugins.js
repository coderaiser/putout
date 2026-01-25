import removeDependenciesStatusBadge from './rules/remove-dependencies-status-badge.js';
import removeTrailingWhitespacesFromHeading from './rules/remove-trailing-whitespaces-from-heading.js';
import mergeHeadingSpceces from './rules/merge-heading-spaces.js';
import * as splitNpmLink from './rules/split-npm-link/index.js';

export const plugins = [
    removeDependenciesStatusBadge,
    removeTrailingWhitespacesFromHeading,
    mergeHeadingSpceces,
    splitNpmLink,
];
