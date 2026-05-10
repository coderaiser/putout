export const traverse = () => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {exportsPath} = getProperties(__aPath, ['exports']);

        if (!exportsPath)
            return;

        for (const property of exportsPath.get('value.properties')) {
            const {value} = property.node;

            if (!isObjectExpression(value))
                continue;

            if (value.properties.length === 1)
                push(property);
        }
    },
});
