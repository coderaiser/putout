'use strict';

const readAllFiles = require('@putout/plugin-filesystem/read-all-files');

const test = require('..')(__dirname, {
    'read-all-files': readAllFiles,
});

test('@putout/test: progress', async ({progress}) => {
    await progress('progress', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'read-all-files',
    });
});
