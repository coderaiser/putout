'use strict';

const {isDeepStrictEqual} = require('node:util');
const {operator, template} = require('putout');

const {
    replaceWith,
    getTemplateValues,
    traverseProperties,
    __yaml,
} = operator;

const defaultVersions = [
    '18.x',
    '20.x',
    '22.x',
    '23.x',
];

const {parse, stringify} = JSON;

module.exports.report = () => 'Latest version of node is missing';

module.exports.fix = (path, {options}) => {
    const {
        versions = defaultVersions,
    } = options;
    
    const nodeVersionsNode = template.ast(stringify(versions));
    
    replaceWith(path, nodeVersionsNode);
};

module.exports.traverse = ({push, options}) => ({
    [__yaml](path) {
        const {
            versions: nodeVersions = defaultVersions,
        } = options;
        
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const nodeVersionPath of traverseProperties(__object, 'node-version')) {
            const valueStr = nodeVersionPath.get('value').toString();
            
            const versions = parse(valueStr);
            
            if (versions === '${{ matrix.node-version }}')
                continue;
            
            if (isDeepStrictEqual(versions, nodeVersions))
                continue;
            
            push(nodeVersionPath.get('value'));
        }
    },
});
