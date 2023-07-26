async function stuff(): Promise<string> {
    return 'stuff';
}

function doStuff(): Promise<string> {
    return stuff();
}

function doStuffd(): Promise<__a> {
    return stuff();
}

