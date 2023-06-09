async () => {
    const result = transformer.transform(realTransformer, transformCode, code, parser);
    
    const result2 = await Promise.reject(result);
    
    return result2;
};
