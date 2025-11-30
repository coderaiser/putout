const outputFile = getOutputFile({
    dirPath,
    outputFilename,
});

const outputFile2 = getOutputFile({
    dirPath,
    matchInputFilename,
});

const getOutputFile = ({dirPath, outputFile}) => {
    return createFile(dirPath);
};
