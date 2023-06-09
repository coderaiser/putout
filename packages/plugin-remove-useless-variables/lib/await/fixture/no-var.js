async () => {
    const result = transformer.transform(realTransformer, transformCode, code, parser);
    
    result2 = await Promise.resolve(result);
    
    return result2;
};
