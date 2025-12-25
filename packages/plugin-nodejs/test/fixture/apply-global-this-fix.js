import {unlinkSync} from 'node:fs';

globalThis.__putout_debug = debugFn;
delete globalThis.__putout_debug;
const {__putout_debug} = globalThis;
const fn = globalThis.unlinkSync || unlinkSync;
