import child_process from './modules/child_process.js';
import util from './modules/util.js';
import url from './modules/url.js';
import zlib from './modules/zlib.js';
import os from './modules/os.js';
import stream from './modules/stream.js';
import module from './modules/module.js';
import process from './modules/process.js';
import path from './modules/path.js';
import fsPromises from './modules/fs-promises.js';
import fs from './modules/fs.js';
import events from './modules/events.js';
import timers from './modules/timers.js';

export const declare = () => ({
    ...events,
    ...fs,
    ...fsPromises,
    ...path,
    ...process,
    ...module,
    ...stream,
    ...os,
    ...zlib,
    ...url,
    ...util,
    ...child_process,
    ...timers,
});
