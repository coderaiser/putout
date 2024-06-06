export function mergeProps() {
    const n = a();
    
    if (n) {
        n();
    }
    
    if (true) {
        const n = b();
        
        if (n)
            n();
    }
}

