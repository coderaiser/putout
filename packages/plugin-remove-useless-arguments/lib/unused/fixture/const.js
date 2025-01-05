const outputFile = getOutputFile(mainPath, {
    dirPath,
    matchInputFilename,
    outputFilename,
    inputFile,
});

const getOutputFile = (path, {dirPath, matchInputFilename, outputFilename, inputFile}) => {
    return createFile(dirPath, outputFilename);
}
