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
    ...require('./os'),
    ...require('./zlib'),
    ...require('./url'),
    ...require('./child_process'),
};

