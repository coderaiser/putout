import {transform} from 'putout';
import * as applyNamedImportPlugin from './apply-named-import/index.js';

export const transformNamedImport = (ast, {name, source, content}) => {
    transform(ast, content, {
        rules: {
            'apply-named-import': ['on', {
                name,
                source,
            }],
        },
        plugins: [
            ['apply-named-import', applyNamedImportPlugin],
        ],
    });
};
