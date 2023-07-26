async function stuff(): Promise<string> {
    return 'stuff';
}

function doStuff(): string {
    return stuff();
}

function doStuffd(): __a {
    return stuff();
}
