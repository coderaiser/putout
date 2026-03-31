export const print = (instructions) => {
    const stdout = [];
    const write = (a) => stdout.push(a);
    
    let line = 0;
    
    for (const [index, [instruction, ...args]] of instructions.entries()) {
        ++line;
        
        const argsCount = args.length - 1;
        
        if (index && instruction !== instructions[index - 1][0])
            write('\n');
        
        write(instruction);
        write(' ');
        
        for (const [index, value] of args.entries()) {
            write(value);
            
            if (value === '&&')
                write(' \\\n    ');
            else if (index < argsCount)
                write(' ');
        }
        
        write('\n');
    }
    
    return stdout.join('');
};
