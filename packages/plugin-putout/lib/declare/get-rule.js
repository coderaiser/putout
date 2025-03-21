import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

export const getRule = (name, options = 'on') => ({
    [name]: [options, require(`./${name}`)],
});
