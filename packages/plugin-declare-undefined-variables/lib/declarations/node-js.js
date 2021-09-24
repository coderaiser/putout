'use strict';

const fsPromises = require('./fs-promises');

const path = {
    basename: `import {basename} from 'path'`,
    extname: `import {extname} from 'path'`,
    dirname: `import {dirname} from 'path'`,
    join: `import {join} from 'path'`,
};

const fs = {
    ...fsPromises,
    Readable: `import {Readable} from 'stream'`,
    readFileSync: `import {readFileSync} from 'fs'`,
    writeFileSync: `import {writeFileSync} from 'fs'`,
};

module.exports = {
    ...path,
    ...fs,
};

