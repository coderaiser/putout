import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import * as processor from './index.js';

export const createTest = (url, plugins) => {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    
    return processor.createTest(__dirname, plugins);
};
