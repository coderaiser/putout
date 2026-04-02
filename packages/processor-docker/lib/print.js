export const print = (instructions) => {
    const stdout = [];
    const write = (a) => stdout.push(a);
    
    let line = 0;
    
    for (const [index, [instruction, ...args]] of instructions.entries()) {
        ++line;
        
        if (index && instruction !== instructions[index - 1][0])
            write('\n');
        
        write(instruction);
        write(' ');
        
        const n = args.length - 1;
        
        for (const [index, arg] of args.entries()) {
            if (instruction === 'RUN') {
                write(arg.replaceAll(/\s+&&\s+/g, ' && \\\n    '));
                continue;
            }
            
            if (instruction === 'ENV') {
                write(arg.replaceAll(/\s{5}/g, ' \\\n    '));
                continue;
            }
            
            write(arg);
            
            if (index < n)
                write(' ');
        }
        
        write('\n');
    }
    
    return stdout.join('');
};
