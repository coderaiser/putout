const {
    jsxIdentifier,
    jsxOpeningElement,
    jsxElement,
} = types;

attr.value.expression = jsxElement(jsxOpeningElement(
    jsxIdentifier(name),
    [],
    SELF_CLOSING,
), null, []);
