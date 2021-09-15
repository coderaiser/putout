'use strict';

const {template} = require('putout');

module.exports = {
    'assign': template.ast('const {assign} = Object'),
    'entries': template.ast('const {entries} = Object'),
    'keys': template.ast('const {keys} = Object'),
    'parse': template.ast('const {parse} = JSON'),
    'stringify': template.ast('const {stringify} = JSON'),
    'join': template.ast(`import {join} from 'path'`),
    'Readable.from': template.ast(`import {Readable} from 'stream'`),
    'tryCatch': template.ast(`import tryCatch from 'try-catch'`),
    'tryToCatch': template.ast(`import tryToCatch from 'try-to-catch'`),
    'readFile': template.ast(`import {readFile} from 'fs/promises'`),
    'montag': template.ast(`import montag from 'montag'`),
    'mockImport': template.ast(`{
        import {createMockImport} from 'mock-import';
        const {mockImport, stopAll, reImport} = createMockImport(import.meta.url);
    }`),
};
