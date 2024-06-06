export const match = () => ({
    'const __a = __b': ({__a}) => {
        if (!isIdentifier(__a))
            return false;

        const {name} = __a;
        const bindings = getAllBindings(name);

        return true;
    },
});
