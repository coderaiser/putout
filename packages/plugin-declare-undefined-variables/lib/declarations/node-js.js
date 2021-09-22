'use strict';

const {template} = require('putout');
const lazyAST = (a) => () => template.ast(a);

const path = {
    basename: lazyAST(`import {basename} from 'path'`),
    extname: lazyAST(`import {extname} from 'path'`),
    dirname: lazyAST(`import {dirname} from 'path'`),
    join: lazyAST(`import {join} from 'path'`),
};

const fs = {
    Readable: lazyAST(`import {Readable} from 'stream'`),
    readFile: lazyAST(`import {readFile} from 'fs/promises'`),
};

module.exports = {
    ...path,
    ...fs,
};

