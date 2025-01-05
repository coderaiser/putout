export const createPath = ({tokens, start, end}) => ({
    isNextPunctuator: createIsNextPunctuator({
        tokens,
        end,
    }),
});

const createIsNextPunctuator = ({tokens, end}) => () => {
    const current = tokens[end];
    
    if (!current)
        return false;
    
    return isPunctuator(current, ';');
};
