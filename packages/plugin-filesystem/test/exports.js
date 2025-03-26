import {test} from 'supertape';

import * as toSimple from '@putout/plugin-filesystem/to-simple';
import * as fromSimple from '@putout/plugin-filesystem/from-simple';
import * as readAllFiles from '@putout/plugin-filesystem/read-all-files';
import * as writeAllFiles from '@putout/plugin-filesystem/write-all-files';
import * as replaceCwd from '@putout/plugin-filesystem/replace-cwd';
import * as convertFilesystemToSimpleFilesystem from '../lib/convert-filesystem-to-simple-filesystem/index.cjs';
import * as convertSimpleFilesystemToFilesystem from '../lib/convert-simple-filesystem-to-filesystem/index.cjs';
import * as readAllFilesOriginal from '../lib/read-all-files/index.js';
import * as writeAllFilesOriginal from '../lib/write-all-files/index.js';
import * as replaceCwdOriginal from '../lib/replace-cwd/index.js';

test('@putout/plugin-filesystem: exports: toSimple', (t) => {
    t.equal(toSimple, convertFilesystemToSimpleFilesystem);
    t.end();
});

test('@putout/plugin-filesystem: exports: fromSimple', (t) => {
    t.equal(fromSimple, convertSimpleFilesystemToFilesystem);
    t.end();
});

test('@putout/plugin-filesystem: exports: read-all-files', (t) => {
    t.equal(readAllFiles, readAllFilesOriginal);
    t.end();
});

test('@putout/plugin-filesystem: exports: write-all-files', (t) => {
    t.equal(writeAllFiles, writeAllFilesOriginal);
    t.end();
});

test('@putout/plugin-filesystem: exports: replace-cwd', (t) => {
    t.equal(replaceCwd, replaceCwdOriginal);
    t.end();
});
