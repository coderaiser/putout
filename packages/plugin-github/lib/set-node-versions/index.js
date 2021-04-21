'use strict';

const {operator, template} = require('putout');
const {replaceWith} = require('putout').operator;
const deepEqual = require('fast-deep-equal');

const {
    traverse,
    getTemplateValues,
} = operator;

const nodeVersions = [
    '14.x',
    '16.x',
];

const nodeVersionsNode = template.ast(`[
  "14.x",
  "16.x"
]`);

const {parse} = JSON;

module.exports.report = () => 'Latest version of node is missing';

module.exports.fix = (path) => {
    replaceWith(path, nodeVersionsNode);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        traverse(__a, {
            '__object'(path) {
                const nodeVersionPath = path.get('properties.0');
                const {value} = nodeVersionPath.get('key').node;
                
                if (value === 'node-version') {
                    const versions = parse(String(path))['node-version'];
                    
                    if (versions === '${{ matrix.node-version }}')
                        return;
                    
                    if (deepEqual(versions, nodeVersions))
                        return;
                    
                    push(nodeVersionPath.get('value'));
                }
            },
        });
        
        return path;
    },
});

