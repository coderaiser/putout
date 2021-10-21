'use strict';

const fsPromises = require('./fs-promises');
const path = require('./path');

const fs = {
    ...fsPromises,
    Readable: `import {Readable} from 'stream'`,
    readFileSync: `import {readFileSync} from 'fs'`,
    writeFileSync: `import {writeFileSync} from 'fs'`,
};

module.exports = {
    ...path,
    ...fs,
    ...require('./module'),
};

