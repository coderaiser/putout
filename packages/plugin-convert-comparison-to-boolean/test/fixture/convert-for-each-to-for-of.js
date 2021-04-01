variable.defs.forEach(def => {
    const { type, node } = def;

    // FunctionDeclarations
    if (type === "FunctionName") {
        functionDefinitions.push(node);
    }
});
