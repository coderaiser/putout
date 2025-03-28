import {types} from 'putout';

const {
    JSXIdentifier,
    JSXOpeningElement,
    JSXElement,
} = types;

export const report = () => `Use 'element' instead of 'component'`;

const SELF_CLOSING = true;

export const fix = (path) => {
    for (const attr of path.node.attributes) {
        if (attr.name.name !== 'component')
            continue;
        
        attr.name.name = 'element';
        
        const {name} = attr.value.expression;
        
        attr.value.expression = JSXElement(JSXOpeningElement(
            JSXIdentifier(name),
            [],
            SELF_CLOSING,
        ), null, []);
    }
};

export const traverse = ({push}) => ({
    JSXOpeningElement(path) {
        if (path.node.name.name !== 'Route')
            return;
        
        for (const attr of path.node.attributes) {
            if (attr.name.name === 'component')
                push(path);
        }
    },
});
