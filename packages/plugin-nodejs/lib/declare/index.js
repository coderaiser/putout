import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const declare = () => ({
    ...require('./modules/events'),
    ...require('./modules/fs'),
    ...require('./modules/fs-promises'),
    ...require('./modules/path'),
    ...require('./modules/process'),
    ...require('./modules/module'),
    ...require('./modules/stream'),
    ...require('./modules/os'),
    ...require('./modules/zlib'),
    ...require('./modules/url'),
    ...require('./modules/util'),
    ...require('./modules/child_process'),
});
