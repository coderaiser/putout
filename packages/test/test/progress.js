import {stripVTControlCharacters} from 'node:util';
import * as readAllFiles from '@putout/plugin-filesystem/read-all-files';
import {tryToCatch} from 'try-to-catch';
import {createTest} from '../lib/test.js';

const testProgress = createTest(import.meta.url, {
    'read-all-files': readAllFiles,
});

const testProgressWithOptions = createTest(import.meta.url, {
    'replace-cwd': readAllFiles,
});

testProgress('@putout/test: progress', async ({progress}) => {
    await progress('progress', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'read-all-files',
    });
});

testProgress('@putout/test: progress: no name', async ({progress, match}) => {
    const [error] = await tryToCatch(progress, {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'read-all-files',
    });
    
    const result = stripVTControlCharacters(error.message);
    
    match(result, `^ ☝️ Looks like you forget to pass the 'name'`);
}, {
    checkAssertionsCount: false,
});

testProgressWithOptions('@putout/test: progress: with-options', async ({progressWithOptions}) => {
    const expected = {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'replace-cwd',
    };
    
    const options = {
        from: '/home/coderaiser',
        to: '/',
    };
    
    await progressWithOptions('progress-with-options', options, expected);
});
