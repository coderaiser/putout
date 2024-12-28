for (let index = 0; index < n; index++) {
    for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
        const currentTokenIndex = index + templateIndex;
        const templateToken = templateTokens[templateIndex];
        const currentToken = tokens[currentTokenIndex];
        
        if (!compareAll(currentToken, templateToken)) {
            isEqual = false;
            break;
        }
        
        isEqual = true;
        start = index;
        end = currentTokenIndex;
    }
    
    if (isEqual)
        return [true, start, ++end];
}
