import {DockerfileParser} from 'dockerfile-ast';

export const parse = (source) => {
    const dockerfile = DockerfileParser.parse(source);
    const instructions = dockerfile.getInstructions();
    const ast = [];
    
    let line = 0;
    
    for (const instr of instructions) {
        ++line;
        
        const arg = instr.getArgumentsContent();
        const instruction = instr.getInstruction();
        const currentInstruction = [instruction];
        const {flags = []} = instr;
        
        for (const {name, value} of flags) {
            currentInstruction.push(`--${name}=${value}`);
        }
        
        currentInstruction.push(arg);
        
        ast.push(currentInstruction);
    }
    
    return ast;
};
