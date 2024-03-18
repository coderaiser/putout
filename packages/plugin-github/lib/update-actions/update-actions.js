'use strict';

const {types, operator} = require('putout');

const {
    replaceWith,
    getTemplateValues,
    traverseProperties,
    __yaml,
} = operator;

const {entries} = Object;

const {StringLiteral} = types;
const cutV = (a) => Number(a.slice(1));
const cutMaster = (a) => a.replace('master', 'v0');

module.exports.updateActions = (actions) => ({
    traverse: traverse(actions),
    fix,
    report,
});

const report = ({name}) => `Update action '${name}' to latest version`;

const fix = ({full, path}) => {
    const checkoutNode = StringLiteral(full);
    replaceWith(path, checkoutNode);
};

const traverse = (actions) => ({push, options}) => ({
    [__yaml](path) {
        const {actions: optionsActions} = options;
        const allActions = {
            ...actions,
            ...optionsActions,
        };
        
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const propertyPath of traverseProperties(__object, 'uses')) {
            const valuePath = propertyPath.get('value');
            const {value} = valuePath.node;
            
            for (const [name, version] of entries(allActions)) {
                const full = `${name}@${version}`;
                
                if (!value.startsWith(name))
                    continue;
                
                if (value === full)
                    continue;
                
                const [, valueVersion] = value.split('@');
                const versionNumber = cutV(version);
                const valueVersionNumber = cutV(cutMaster(valueVersion));
                
                if (versionNumber > valueVersionNumber)
                    push({
                        name,
                        full,
                        path: valuePath,
                    });
            }
        }
    },
});
