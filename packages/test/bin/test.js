#!/usr/bin/env node

import process from 'node:process';
import 'supertape/bin/supertape';
import {callWhenTestsEnds} from 'supertape';
import {getCoverage} from '@putout/printer/type-checker/instrument';
import {report} from '@putout/printer/type-checker/report';

const {log} = console;

callWhenTestsEnds('PUTOUT_INSTRUMENT', () => {
    const coverage = getCoverage();
    const [code, message] = report(coverage);
    
    log(message);
    
    process.exitCode = code;
});
