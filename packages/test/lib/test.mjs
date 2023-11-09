import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import create from './test.js';

export default create;

export const createTest = (url, plugins) => {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    
    return create(__dirname, plugins);
};
