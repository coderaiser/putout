import * as awaitRule from './await/index.js';
import * as asyncRule from './async/index.js';
import * as args from './args/index.js';
import * as declare from './declare/index.js';
import * as expandArgs from './expand-args/index.js';
import * as sync from './sync/index.js';

export const rules = {
    'await': awaitRule,
    'async': asyncRule,
    'args': args,
    'declare': declare,
    'expand-args': expandArgs,
    'sync': sync,
};
