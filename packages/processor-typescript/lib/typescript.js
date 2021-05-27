'use strict';

module.exports.files = [
    '*.ts',
    '*.tsx',
];

module.exports.find = (rawSource) => {
    const {Project} = require('ts-morph');
    const project = new Project();
    
    const sourceFile = project.createSourceFile('__putout_processor_typescript.ts', rawSource);
    const diagnostics = sourceFile.getPreEmitDiagnostics();
    
    const places = diagnostics.map(toPlace);
    
    return places;
};

function toPlace(diagnostic) {
    return {
        rule: 'type-check (typescript)',
        message: diagnostic.getMessageText(),
        position: {
            line: diagnostic.getLineNumber(),
            column: 1,
        },
    };
}

