export const report = () => `Apply default to toJsxString`;

export const replace = () => ({
    'import toJsxString from "react-element-to-jsx-string"': `{
        import toJsxStringDefault from "react-element-to-jsx-string";
        const {default: toJsxString} = toJsxStringDefault;
    }`,
});
