'use strict';

const {operator, template} = require('putout');
const {
    replaceWith,
    getTemplateValues,
} = operator;
const deepEqual = require('fast-deep-equal');

const {traverseProperty} = require('../traverse-property');

const nodeVersions = [
    '16.x',
    '17.x',
];

const nodeVersionsNode = template.ast(`[
  "16.x",
  "17.x",
]`);

const {parse} = JSON;

module.exports.report = () => 'Latest version of node is missing';

module.exports.fix = (path) => {
    replaceWith(path, nodeVersionsNode);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        for (const nodeVersionPath of traverseProperty(__a, 'node-version')) {
            const valueStr = nodeVersionPath.get('value').toString();
            const versions = parse(valueStr);
            
            if (versions === '${{ matrix.node-version }}')
                continue;
            
            if (deepEqual(versions, nodeVersions))
                continue;
            
            push(nodeVersionPath.get('value'));
        }
    },
});

