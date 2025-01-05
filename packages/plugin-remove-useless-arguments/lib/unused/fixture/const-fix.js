const outputFile = getOutputFile({
    dirPath,
    matchInputFilename,
    outputFilename,
    inputFile,
});

const getOutputFile = ({dirPath, matchInputFilename, outputFilename, inputFile}) => {
    return createFile(dirPath, outputFilename);
};
