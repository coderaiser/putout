export const report = () => `Remove implicit 'ref' return`;

export const replace = () => ({
    '<div ref={__a => (__b = __a)} />': '<div ref={__a=> {__b= __a}} />',
});
