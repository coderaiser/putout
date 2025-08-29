for (const [name, value] of Object.keys(tokens)) {
    console.log(name);
}

for (const [name, value] of keys(tokens)) {
    console.log(name);
}

for (const [name, value] of keys(tokens)) {
    for (const [name, value] of keys(tokens)) {
        console.log(name);
    }
}