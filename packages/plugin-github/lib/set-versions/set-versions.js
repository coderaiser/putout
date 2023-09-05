'use strict';

const {types, operator} = require('putout');
const {
    replaceWith,
    getTemplateValues,
    traverseProperties,
} = operator;

const {entries} = Object;

const {StringLiteral} = types;
const cutV = (a) => Number(a.slice(1));
const cutMaster = (a) => a.replace('master', 'v0');

module.exports.setVersions = (actions) => ({
    traverse: traverse(actions),
    fix,
    report,
});

const report = ({name}) => `Latest version of '${name}' is missing`;

const fix = ({full, path}) => {
    const checkoutNode = StringLiteral(full);
    replaceWith(path, checkoutNode);
};

const traverse = (actions) => ({push, options}) => ({
    '__putout_processor_json(__a)'(path) {
        const {actions: optionsActions} = options;
        const allActions = {
            ...actions,
            ...optionsActions,
        };
        
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        for (const propertyPath of traverseProperties(__a, 'uses')) {
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
