import {isDeepStrictEqual} from 'node:util';
import {operator, template} from 'putout';

const {isArray} = Array;

const {
    replaceWith,
    getTemplateValues,
    traverseProperties,
    __yaml,
} = operator;

const defaultVersions = [
    '20.x',
    '22.x',
    '24.x',
    '25.x',
];

const {parse, stringify} = JSON;

export const report = () => 'Use latest version of node';

export const fix = (path, {options}) => {
    const {
        versions = defaultVersions,
    } = options;
    
    const nodeVersionsNode = template.ast(stringify(versions));
    
    replaceWith(path, nodeVersionsNode);
};

export const traverse = ({push, options}) => ({
    [__yaml](path) {
        const {
            versions: nodeVersions = defaultVersions,
        } = options;
        
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const nodeVersionPath of traverseProperties(__object, 'node-version')) {
            let is = false;
            const valueStr = nodeVersionPath.get('value').toString();
            
            const versions = parse(valueStr);
            
            if (versions === '${{ matrix.node-version }}')
                continue;
            
            if (isDeepStrictEqual(versions, nodeVersions))
                continue;
            
            if (!isArray(versions))
                continue;
            
            for (const version of nodeVersions) {
                const [nodeVersion] = version.split('.');
                
                for (const currentVersion of versions) {
                    const [current] = currentVersion.split('.');
                    
                    if (current !== nodeVersion) {
                        is = true;
                        break;
                    }
                }
            }
            
            if (is)
                push(nodeVersionPath.get('value'));
        }
    },
});
