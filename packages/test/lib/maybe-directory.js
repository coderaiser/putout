import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

export function maybeDirectory(url) {
    if (url.startsWith('file:')) {
        const __filename = fileURLToPath(url);
        return dirname(__filename);
    }
    
    return url;
}
