const {__putout_debug} = globalThis;

globalThis.__putout_debug = debugFn;
delete globalThis.__putout_debug;
const fn = globalThis.unlinkSync || unlinkSync;
