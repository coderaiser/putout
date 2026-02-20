import {loadPlugins} from '@putout/engine-loader';

export const parseScheme = (pluginNames) => {
    const rules = {};
    
    const plugins = loadPlugins({
        pluginNames,
    });
    
    const names = [];
    
    for (const plugin of plugins) {
        names.push(plugin.rule);
    }
    
    for (const rule of names.sort()) {
        const [a] = rule.split('/');
        
        rules[rule] = {
            $ref: '#/definitions/rule',
        };
        rules[a] = {
            $ref: '#/definitions/rule',
        };
    }
    
    return rules;
};
