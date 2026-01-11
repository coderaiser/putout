export const parseError = ({code, message, name}) => {
    if (message.includes('buildError'))
        return 'Parser error';
    
    if (code === 'ERR_REQUIRE_ESM')
        return `☝️ Looks like '${name}' is ESM, consider updating node to >= v20.19`;
    
    return message;
};
