export function dropInteractive(argv) {
    const result = [];
    
    for (const arg of argv) {
        if (arg === '-i' || arg === '--interactive')
            continue;
        
        result.push(arg);
    }
    
    return result;
}
