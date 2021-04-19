const {readFile} = require('fs/promises');
const {join} = require('path');

const {test, stub} = require('supertape');
const processFile = require('putout/process-file');
const {getFilePatterns} = require('..');
const {runProcessors} = require('..');
