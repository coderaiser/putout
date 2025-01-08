const createIsNextPunctuator = ({tokens, end}) => (punctuator) => {
    const current = tokens[end - 1];
    
    if (!current)
        return false;
    
    return isPunctuator(current, punctuator);
};

const createIsCurrentPunctuator = ({tokens, end}) => (punctuator) => {
    const current = tokens[end - 1];

    if (!current)
        return false;

    return isPunctuator(current, punctuator);
};
