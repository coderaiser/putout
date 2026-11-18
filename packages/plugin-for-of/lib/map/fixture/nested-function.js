const args = params.map((arg) => {
    const get = () => {
        return arg.id;
    };
    
    return get();
});
