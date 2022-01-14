import {dirname} from 'path';
import {fileURLToPath} from 'url';
import create from './test.js';

export default create;

export const createTest = (url, plugins) => {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    
    return create(__dirname, plugins);
};
