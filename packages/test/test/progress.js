'use strict';

const readAllFiles = require('@putout/plugin-filesystem/read-all-files');
const tryToCatch = require('try-to-catch');

const testProgress = require('..')(__dirname, {
    'read-all-files': readAllFiles,
});

const testProgressWithOptions = require('..')(__dirname, {
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
    
    match(error.message, `☝️ Looks like you forget to pass the 'name'`);
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
