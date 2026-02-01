import {operator} from 'putout';

const {
    getProperties,
    setLiteralValue,
    __json,
} = operator;

export const report = ({nodeVersion, currentNodeVersion, putoutVersion}) => {
    return `Set engines node '>=${nodeVersion}' instead of '>=${currentNodeVersion}' for 🐊 '>=${putoutVersion}'`;
};

export const fix = ({path}) => {
    setLiteralValue(path.node, `>=22`);
};

export const traverse = ({push, options}) => ({
    [__json]: (path) => {
        const {
            nodeVersion = 22,
            putoutVersion = 41,
        } = options;
        const __aPath = path.get('arguments.0');
        const {
            peerDependenciesPath,
            enginesPath,
        } = getProperties(__aPath, ['peerDependencies', 'engines']);
        
        if (!peerDependenciesPath || !enginesPath)
            return;
        
        const peerProperties = peerDependenciesPath.get('value.properties');
        
        if (!peerProperties.length)
            return;
        
        const enginesProperties = enginesPath.get('value.properties');
        
        if (!enginesProperties.length)
            return;
        
        const peer = peerProperties[0].get('value');
        
        if (Number(peer.node.value.slice(2)) < putoutVersion)
            return;
        
        const engine = enginesPath.get('value.properties.0.value');
        
        const currentNodeVersion = Number(engine.node.value.slice(2));
        
        if (currentNodeVersion >= nodeVersion)
            return;
        
        push({
            path: engine,
            nodeVersion,
            currentNodeVersion,
            putoutVersion,
        });
    },
});
