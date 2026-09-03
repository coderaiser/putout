const isObject = (a: unknown): a is object => a as boolean && typeof a === 'object';
