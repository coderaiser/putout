'use strict';

const {types} = require('putout');
const {
    JSXIdentifier,
    JSXOpeningElement,
    JSXElement,
} = types;

module.exports.report = () => `Use 'element' instead of 'component'`;

const SELF_CLOSING = true;

module.exports.fix = (path) => {
    for (const attr of path.node.attributes) {
        if (attr.name.name !== 'component')
            continue;
        
        attr.name.name = 'element';
        
        const {name} = attr.value.expression;
        attr.value.expression = JSXElement(
            JSXOpeningElement(
                JSXIdentifier(name),
                [],
                SELF_CLOSING,
            ),
            null,
            [],
        );
    }
};

module.exports.traverse = ({push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'Route')
            return;
        
        for (const attr of path.node.attributes) {
            if (attr.name.name === 'component')
                push(path);
        }
    },
});
