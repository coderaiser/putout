import {register} from 'node:module';

register('./loader.mjs', new URL('./loader.mjs', import.meta.url));
