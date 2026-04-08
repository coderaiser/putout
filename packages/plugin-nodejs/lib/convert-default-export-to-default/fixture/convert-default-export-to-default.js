mock.module('fs', {
   defaultExport: hello,
   namedExports: {
   	  foo,
       hello,
       abc,
       abcd
   },
});
