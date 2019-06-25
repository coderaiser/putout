'use strict';

const {replaceWith} = require('putout').operate;

const {template} = require('putout');

const forOfTemplate = template(`
  for (const %%item%% of %%items%%) {
    %%body%%
  }
`);

module.exports.report = () => `for-of should be used instead of forEach`;

module.exports.fix = (path) => {
    const {parentPath} = path;
    const {params, body} = parentPath.node.arguments[0];
    const [item] = params;
    
    replaceWith(parentPath.parentPath, forOfTemplate({
        item,
        items: path.node.object,
        body,
    }));
};

module.exports.traverse = ({push}) => {
    return {
        MemberExpression(path) {
            const {parentPath} = path;
            const propertyPath = path.get('property');
            
            if (!propertyPath.isIdentifier({name: 'forEach'}))
                return;
            
            const argPath = parentPath.get('arguments.0');
            
            if (!argPath.isFunction())
                return;
            
            push(path);
        },
    };
};
