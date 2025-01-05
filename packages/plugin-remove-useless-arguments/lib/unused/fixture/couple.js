const outputFile = getOutputFile(mainPath, {
    dirPath,
    outputFilename,
});

const outputFile2 = getOutputFile(mainPath, {
    dirPath,
    matchInputFilename,
});

const getOutputFile = (path, {dirPath, outputFile}) => {
    return createFile(dirPath);
}
