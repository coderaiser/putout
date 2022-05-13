import {dirname} from 'path';
import {fileURLToPath} from 'url';
import processor from './index.js';

export const createTest = (url, plugins) => {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    
    return processor.createTest(__dirname, plugins);
};
