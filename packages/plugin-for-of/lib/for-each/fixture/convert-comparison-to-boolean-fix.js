for (const {
    type,
    node
} of variable.defs) {
    // FunctionDeclarations
    if (type === "FunctionName") {
        functionDefinitions.push(node);
    }
}
