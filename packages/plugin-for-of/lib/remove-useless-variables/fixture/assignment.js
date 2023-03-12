for (const currentProcessor of loadedProcessors) {
    const {
        isMatch,
        preProcess = stubPreProcess,
        postProcess = stubPostProcess,
        process = stubProcess,
    } = currentProcessor;
}

