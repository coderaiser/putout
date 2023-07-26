export const files = [
    '*.ts',
    '*.tsx',
];

export const find = async (rawSource) => {
    const {Project} = await import('ts-morph');
    const project = new Project();
    
    const sourceFile = project.createSourceFile('__putout_processor_typescript.ts', rawSource);
    const diagnostics = sourceFile.getPreEmitDiagnostics();
    
    return diagnostics.map(toPlace);
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
