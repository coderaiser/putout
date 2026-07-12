import {
    matchToFlatDir,
    matchToFlat,
    mergeESLintConfigs,
    createESLintConfig,
} from '../lib/flat.js';

// THROWS Expected 2-4 arguments, but got 1
matchToFlatDir('cwd');

// THROWS Argument of type 'number' is not assignable to parameter of type 'Record<string, Record<string, "off" | "on">>'.
matchToFlat(5);

// THROWS Expected 2-3 arguments, but got 0
mergeESLintConfigs();

// THROWS Type '5' has no properties in common with type 'FlatConfig'.
createESLintConfig(5);
