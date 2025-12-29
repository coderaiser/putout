import _module from 'node:module';

const returns = (a) => () => a;
const noop = () => {};

export const createRequire = (url, overrides = {}) => {
    const {module = _module} = overrides;
    const {createRequire = returns(noop)} = module;
    
    return createRequire(url);
};
