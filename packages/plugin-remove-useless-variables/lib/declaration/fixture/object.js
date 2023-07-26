if (index === count - 1) {
    const result = {
        errors,
        filesCount,
        errorsCount,
    };
    
    errors = [];
    return result;
}
