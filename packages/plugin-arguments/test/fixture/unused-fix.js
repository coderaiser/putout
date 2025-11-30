member += compute(list[i]);

function compute(current) {
    return `${current}`;
}

a.b();
a();

const outputFile = getOutputFile({
    dirPath,
    matchInputFilename,
    outputFilename,
    inputFile,
});

function getOutputFile({dirPath, matchInputFilename, outputFilename, inputFile}) {
    return createFile(dirPath, outputFilename);
}
