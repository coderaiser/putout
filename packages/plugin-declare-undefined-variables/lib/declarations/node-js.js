'use strict';

const path = {
    basename: `import {basename} from 'path'`,
    extname: `import {extname} from 'path'`,
    dirname: `import {dirname} from 'path'`,
    join: `import {join} from 'path'`,
};

const fs = {
    Readable: `import {Readable} from 'stream'`,
    readFile: `import {readFile} from 'fs/promises'`,
    readFileSync: `import {readFileSync} from 'fs'`,
    writeFile: `import {writeFile} from 'fs/promises'`,
    writeFileSync: `import {writeFileSync} from 'fs'`,
};

module.exports = {
    ...path,
    ...fs,
};

