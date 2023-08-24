import {createTest} from '@putout/test';

import plugin from '../lib/apply-entries.js';
import rmUnused from '@putout/plugin-remove-unused-variables';
import progress, {maybeZero} from '../lib/memory.js';
