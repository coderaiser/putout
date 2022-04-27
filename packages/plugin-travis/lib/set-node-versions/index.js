'use strict';

const {types} = require('putout');
const deepEqual = require('fast-deep-equal');

const {NumericLiteral} = types;

const isNodeJS = (property) => property.key.value === 'node_js';
const getValue = ({value}) => value;
const one = (f) => (a) => f(a);

const defaultVersions = [
    16,
    18,
];

module.exports.report = () => 'Latest version of node is missing';

module.exports.match = () => ({
    '__putout_processor_json(__a)'({__a}) {
        const nodeJS = __a.properties.find(isNodeJS);
        
        if (!nodeJS)
            return false;
        
        const {elements} = nodeJS.value;
        const nodeVersions = elements.map(getValue);
        
        return !deepEqual(nodeVersions, defaultVersions);
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)'({__a}, path) {
        const nodeJS = __a.properties.find(isNodeJS);
        
        nodeJS.value.elements = defaultVersions.map(one(NumericLiteral));
        
        return path;
    },
});

