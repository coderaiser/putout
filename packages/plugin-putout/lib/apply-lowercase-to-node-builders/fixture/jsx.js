const {
    JSXIdentifier,
    JSXOpeningElement,
    JSXElement,
} = types;

attr.value.expression = JSXElement(JSXOpeningElement(
    JSXIdentifier(name),
    [],
    SELF_CLOSING,
), null, []);
