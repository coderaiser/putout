import plugins from '@putout/engine-parser/babel/plugins';

const fn = (a: string) => a;

// THROWS Argument of type 'readonly Plugin[]' is not assignable to parameter of type 'string'.
fn(plugins);
