transform(ast, options);
findPlaces(ast, options);

tryCatch(transform, ast, {});

tryCatch(findPlaces, ast, resultOptions);

return test.extend({
    transform: transform(dir, linterOptions, options),
});
const places = await transformAsync(ast, {});
