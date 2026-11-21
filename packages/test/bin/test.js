#!/usr/bin/env node

import process from 'node:process';

const hook = new URL('./type-check-coverage.js', import.meta.url);

// supertape runs tests in a worker, so the hook has to be loaded there
process.argv.splice(2, 0, '-r', hook.href);

await import('supertape/bin/supertape');
