'use strict';

module.exports = {
    ...require('./fs'),
    ...require('./fs-promises'),
    ...require('./path'),
    ...require('./process'),
    ...require('./module'),
    ...require('./stream'),
    ...require('./os'),
    ...require('./zlib'),
    ...require('./url'),
    ...require('./child_process'),
};

