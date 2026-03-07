import process from 'node:process';
import {isOnlyTests} from 'supertape';
import {getCoverage} from '@putout/printer/type-checker/instrument';
import {report} from '@putout/printer/type-checker/report';

if (process.env.PUTOUT_INSTRUMENT)
    process.on('exit', () => {
        if (isOnlyTests())
            return;
        
        const coverage = getCoverage();
        const [code] = report(coverage);
        
        process.exitCode = code;
    });
