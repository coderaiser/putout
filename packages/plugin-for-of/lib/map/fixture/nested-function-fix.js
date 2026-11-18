{
    const args = [];
    
    for (const arg of params) {
        const get = () => {
            return arg.id;
        };
        
        args.push(get());
    }
}
