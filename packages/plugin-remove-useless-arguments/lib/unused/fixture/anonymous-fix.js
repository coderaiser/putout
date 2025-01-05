const outputFile = getOutputFile({
    dirPath,
    outputFilename,
});

const outputFile2 = getOutputFile({
    dirPath,
    matchInputFilename,
});

const getOutputFile = function({dirPath, outputFile}) {
    return createFile(dirPath);
};
