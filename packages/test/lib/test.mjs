import {createCommons} from 'simport';
import create from './test.js';

export default create;

export const createTest = (url, plugins) => {
    const {__dirname} = createCommons(url);
    return create(__dirname, plugins);
};
