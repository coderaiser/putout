import {operator} from 'putout';
import * as sortContents from './sort-contents/index.js';

const {
    matchFiles,
    getFilename,
    getParentDirectory,
} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
    files: {
        'README.md': {
            plugins: [
                ['sort-contents', sortContents],
            ],
        },
    },
    exclude: (file) => {
        const dir = getParentDirectory(file);
        const dirname = getFilename(dir);
        
        return !/plugin-.*$/.test(dirname);
    },
});
