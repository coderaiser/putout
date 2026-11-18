const args = [];

for (const arg of params) {
    use(arg);
    args.push(arg);
}

args[0] = identifier(name);
