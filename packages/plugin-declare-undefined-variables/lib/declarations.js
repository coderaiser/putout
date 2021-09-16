'use strict';

const {template} = require('putout');

module.exports = {
    'assign': template.ast('const {assign} = Object'),
    'entries': template.ast('const {entries} = Object'),
    'keys': template.ast('const {keys} = Object'),
    
    'parse': template.ast('const {parse} = JSON'),
    'stringify': template.ast('const {stringify} = JSON'),
    
    'basename': template.ast(`import {basename} from 'path'`),
    'extname': template.ast(`import {extname} from 'path'`),
    'dirname': template.ast(`import {dirname} from 'path'`),
    'join': template.ast(`import {join} from 'path'`),
    
    'Readable.from': template.ast(`import {Readable} from 'stream'`),
    'readFile': template.ast(`import {readFile} from 'fs/promises'`),
    
    'tryCatch': template.ast(`import tryCatch from 'try-catch'`),
    'tryToCatch': template.ast(`import tryToCatch from 'try-to-catch'`),
    
    'montag': template.ast(`import montag from 'montag'`),
    
    'mockImport': template.ast(`const {mockImport} = createMockImport(import.meta.url)`),
    'reImport': template.ast(`const {reImport} = createMockImport(import.meta.url)`),
    'stopAll': template.ast(`const {stopAll} = createMockImport(import.meta.url)`),
    'createMockImport': template.ast(`import {createMockImport} from 'mock-import';`),
};
