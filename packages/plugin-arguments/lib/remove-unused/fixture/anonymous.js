const outputFile = getOutputFile(mainPath, {
    dirPath,
    outputFilename,
});

const outputFile2 = getOutputFile(mainPath, {
    dirPath,
    matchInputFilename,
});

const getOutputFile = function(path, {dirPath, outputFile}) {
    return createFile(dirPath);
}
