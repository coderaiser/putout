function compare(object, context) {
    const comments = false;
    
    const objectCode = generate(object, {
        comments,
    }).code;
    
    const contextCode = generate(context, {
        comments,
    }).code;
    
    return !objectCode.indexOf(contextCode);
}
