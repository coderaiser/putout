import * as removeDependenciesStatusBadge from './rules/remove-dependencies-status-badge/index.js';
import * as removeTrailingWhitespacesFromHeading from './rules/remove-trailing-whitespaces-from-heading/index.js';
import * as mergeHeadingSpceces from './rules/merge-heading-spaces/index.js';
import * as splitNpmLink from './rules/split-npm-link/index.js';

export const plugins = [
    removeDependenciesStatusBadge,
    removeTrailingWhitespacesFromHeading,
    mergeHeadingSpceces,
    splitNpmLink,
];
