import {operator} from 'putout';
import * as sortContents from './sort-contents/index.js';
import * as sortHeadings from './sort-headings/index.js';

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
            rules: {
                'sort-headings': 'off',
            },
            plugins: [
                ['sort-contents', sortContents],
                ['sort-headings', sortHeadings],
            ],
        },
    },
    exclude: (file) => {
        const dir = getParentDirectory(file);
        const dirname = getFilename(dir);
        
        return !/plugin-.*$/.test(dirname);
    },
});
