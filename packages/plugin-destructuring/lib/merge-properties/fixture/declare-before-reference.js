export const replace = () => ({
    'return __a': ({__a}, path) => {
        if (fnPath) {
            const {returnType} = fnPath.node;

            if (returnType) {
                fnPath.__ishvara_return_type = name;
                delete fnPath.node.returnType;
                const {name} = returnType.typeAnnotation.typeName;
                const reg = getReg(name);

                return '';
            }
        }

        return '';
    },
});
