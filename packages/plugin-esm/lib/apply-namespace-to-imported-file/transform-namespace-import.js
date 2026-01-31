import {transform} from 'putout';
import * as applyNamespaceImportPlugin from './apply-namespace-import/index.js';

export const transformNamespaceImport = (ast, {source, content, name}) => {
    transform(ast, content, {
        rules: {
            'apply-namespace-import': ['on', {
                name,
                source,
            }],
        },
        plugins: [
            ['apply-namespace-import', applyNamespaceImportPlugin],
        ],
    });
};
