function get({update}) {
    const create = update;
    
    return {
        create,
    };
}

get({
    update: false,
});
