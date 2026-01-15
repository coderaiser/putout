window.__putout_debug = debugFn;
delete window.__putout_debug;
const {__putout_debug} = window;
const fn = window.unlinkSync || unlinkSync;
