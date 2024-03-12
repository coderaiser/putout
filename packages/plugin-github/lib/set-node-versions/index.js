import {operator, template} from 'putout';
import deepEqual from 'fast-deep-equal';

const {
    replaceWith,
    getTemplateValues,
    traverseProperties,
    __yaml,
} = operator;

const defaultVersions = [
    '18.x',
    '20.x',
    '21.x',
];

const {parse, stringify} = JSON;

export const report = () => 'Latest version of node is missing';

export const fix = (path, {options}) => {
    const {versions = defaultVersions} = options;
    const nodeVersionsNode = template.ast(stringify(versions));
    
    replaceWith(path, nodeVersionsNode);
};

export const traverse = ({push, options}) => ({
    [__yaml](path) {
        const {versions: nodeVersions = defaultVersions} = options;
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const nodeVersionPath of traverseProperties(__object, 'node-version')) {
            const valueStr = nodeVersionPath
                .get('value')
                .toString();
            
            const versions = parse(valueStr);
            
            if (versions === '${{ matrix.node-version }}')
                continue;
            
            if (deepEqual(versions, nodeVersions))
                continue;
            
            push(nodeVersionPath.get('value'));
        }
    },
});
