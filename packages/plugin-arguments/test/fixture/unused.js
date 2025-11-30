 member += compute(member, list[i]);
 
function compute(member, current) {
    return `${current}`;
}

a.b();
a();

const outputFile = getOutputFile(mainPath, {
    dirPath,
    matchInputFilename,
    outputFilename,
    inputFile,
});

function getOutputFile(path, {dirPath, matchInputFilename, outputFilename, inputFile}) {
    return createFile(dirPath, outputFilename);
}