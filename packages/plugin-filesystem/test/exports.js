'use strict';

const {test} = require('supertape');
const toSimple = require('@putout/plugin-filesystem/to-simple');
const fromSimple = require('@putout/plugin-filesystem/from-simple');

const convertFilesystemToSimpleFilesystem = require('../lib/convert-filesystem-to-simple-filesystem');
const convertSimpleFilesystemToFilesystem = require('../lib/convert-simple-filesystem-to-filesystem');

test('@putout/plugin-filesystem: exports: toSimple', (t) => {
    t.equal(toSimple, convertFilesystemToSimpleFilesystem);
    t.end();
});

test('@putout/plugin-filesystem: exports: fromSimple', (t) => {
    t.equal(fromSimple, convertSimpleFilesystemToFilesystem);
    t.end();
});
