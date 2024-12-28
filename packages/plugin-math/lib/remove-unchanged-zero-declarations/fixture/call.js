for (let index = 0; index < n; index++) {
    const tokenDelta = 0;
    const templateDelta = 0;
    
    fn(tokenDelta);
    fn({
        templateDelta,
    });

    for (let templateIndex = 0; templateIndex < templateTokensLength; templateIndex++) {
        const currentTokenIndex = index + templateIndex - tokenDelta;
        const templateToken = templateTokens[templateIndex - templateDelta];
        const currentToken = tokens[currentTokenIndex];

        if (!compareAll(currentToken, templateToken)) {
            isEqual = false;
            break;
        }

        isEqual = true;
        start = index;
        end = currentTokenIndex + tokenDelta;
    }

    if (isEqual)
        return [true, start, ++end];
}
