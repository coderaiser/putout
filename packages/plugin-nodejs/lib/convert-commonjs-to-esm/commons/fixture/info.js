import {createRequire} from 'module';
const require = createRequire(import.meta.url);

function info() {
    return require('./package.json');
}
