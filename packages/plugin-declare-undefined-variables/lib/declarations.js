'use strict';

const {template} = require('putout');

module.exports = {
    'assign': template.ast('const {assign} = Object'),
    'entries': template.ast('const {entries} = Object'),
    'parse': template.ast('const {parse} = JSON'),
    'stringify': template.ast('const {stringify} = JSON'),
    'join': template.ast(`import {join} from 'path'`),
    'Readable.from': template.ast(`import {Readable} from 'stream'`),
};
