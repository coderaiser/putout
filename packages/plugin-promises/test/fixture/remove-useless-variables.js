async () => {
    const result = transformer.transform(
        realTransformer,
        transformCode,
        code,
        parser,
    );
    
    let result2 = await Promise.resolve(result);
    
    return result2;
}
