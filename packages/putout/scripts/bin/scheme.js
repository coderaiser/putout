#!/usr/bin/env node

import {parseScheme} from '../parse-scheme.js';
import putoutConfig from '../../putout.json' with {
    type: 'json',
};

const {plugins} = putoutConfig;
const rules = parseScheme(plugins);

console.log(JSON.stringify(rules, null, 2));
