export const createPath = ({tokens, start, end}) => ({
    isNextPunctuator: createIsNextPunctuator({
        tokens,
        end,
    }),
});

function createIsNextPunctuator({tokens, end}) {
    return () => {
        const current = tokens[end];
        
        if (!current)
            return false;
        
        return isPunctuator(current, ';');
    };
}
