#!/usr/bin/env node

import process from 'node:process';
import {callWhenTestsEnds} from 'supertape';
import {whenTestsEnds} from '@putout/printer/type-checker/when-tests-ends';

const {PUTOUT_INSTRUMENT} = process.env;

callWhenTestsEnds('PUTOUT_INSTRUMENT', whenTestsEnds);

// coverage of type checkers lives in the thread that creates them,
// so tests must run in the same thread as the report
if (PUTOUT_INSTRUMENT)
    process.argv.push('--no-worker');

await import('supertape/bin/supertape');
