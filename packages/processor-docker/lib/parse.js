import {DockerfileParser} from 'dockerfile-ast';

export const parse = (source) => {
    const dockerfile = DockerfileParser.parse(source);
    const instructions = dockerfile.getInstructions();
    const ast = [];
    
    let line = 0;
    
    for (const instr of instructions) {
        ++line;
        
        const args = instr.getArguments();
        const instruction = instr.getInstruction();
        const currentInstruction = [instruction];
        
        for (const {value} of args) {
            currentInstruction.push(value);
        }
        
        ast.push(currentInstruction);
    }
    
    return ast;
};
