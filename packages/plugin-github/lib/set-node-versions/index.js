'use strict';

const {operator, template} = require('putout');
const {replaceWith} = require('putout').operator;
const deepEqual = require('fast-deep-equal');

const {traverseProperty} = require('../traverse-property');

const {getTemplateValues} = operator;

const nodeVersions = [
    '14.x',
    '16.x',
    '17.x',
];

const nodeVersionsNode = template.ast(`[
  "14.x",
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
        
        traverseProperty(__a, 'node-version', (nodeVersionPath) => {
            const valueStr = nodeVersionPath.get('value').toString();
            const versions = parse(valueStr);
            
            if (versions === '${{ matrix.node-version }}')
                return;
            
            if (deepEqual(versions, nodeVersions))
                return;
            
            push(nodeVersionPath.get('value'));
        });
    },
});

