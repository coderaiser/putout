const {__putout_debug} = self;
self.__putout_debug = debugFn;
delete self.__putout_debug;
const fn = self.unlinkSync || unlinkSync;
