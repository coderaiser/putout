global.__putout_debug = debugFn;
delete global.__putout_debug;
const {__putout_debug} = global;
const fn = global.unlinkSync || unlinkSync;