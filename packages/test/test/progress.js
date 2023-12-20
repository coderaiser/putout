'use strict';

const readAllFiles = require('@putout/plugin-filesystem/read-all-files');

const test = require('..')(__dirname, {
    'read-all-files': readAllFiles,
});

test('@putout/test: progress', async ({progress}) => {
    await progress('progress', {
        i: 0,
        n: 1,
        rule: 'read-all-files',
    });
});
