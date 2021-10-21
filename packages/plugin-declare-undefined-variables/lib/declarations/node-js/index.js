'use strict';

const fs = {
    ...require('./fs-promises'),
    readFileSync: `import {readFileSync} from 'fs'`,
    writeFileSync: `import {writeFileSync} from 'fs'`,
};

module.exports = {
    ...fs,
    ...require('./path'),
    ...require('./module'),
    ...require('./stream'),
};

