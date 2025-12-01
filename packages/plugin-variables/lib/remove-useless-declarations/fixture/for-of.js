const visitor = prePush({
    rule,
    filter,
    push,
    options,
});

for (const str of include)
    result[str] = visitor;
