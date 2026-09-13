import plugins from '@putout/engine-parser/babel/plugins';

const fn = (a: string) => a;

// THROWS Argument of type 'readonly string[]' is not assignable to parameter of type 'string'.
fn(plugins);
