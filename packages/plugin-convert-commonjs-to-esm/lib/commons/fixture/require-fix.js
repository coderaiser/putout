import {createCommons} from 'simport';

const {
    __filename,
    __dirname,
    require
} = createCommons(import.meta.url);

function info() {
    return require('./package.json');
}
