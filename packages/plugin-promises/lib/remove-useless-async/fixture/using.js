async (name, data) => {
    await using disk = createDisk(data);
}

const x = async (name, data) => {
    await using baz = 3, qux = 4;
}
