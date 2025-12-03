function notReferenced() {
    while (!readDirectory(parentDir).length) {}}

function referenced() {
    let files = [];
    
    while (!(files = readDirectory(parentDir)).length) {}
    
    console.log(files);
}

function notIdentifier() {
    let files = [];
    
    while (!(files.x = readDirectory(parentDir)).length) {}}

function notDeclared() {
    while (!(files = readDirectory(parentDir)).length) {}
    
    console.log(files);
}

notDeclared();
notIdentifier();
referenced();
notReferenced();
