import {transform} from 'putout';
import * as applyNamespaceImportPlugin from './apply-namespace-import/index.js';

export const transformNamespaceImport = (ast, {source, name}) => {
    transform(ast, {
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
