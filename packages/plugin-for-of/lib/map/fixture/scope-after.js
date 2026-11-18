const args = params.map((arg) => {
    use(arg);
    return arg;
});

args[0] = identifier(name);
