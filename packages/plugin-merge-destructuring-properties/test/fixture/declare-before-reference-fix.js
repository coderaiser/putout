export const replace = () => ({
    'return __a': ({__a}, path) => {
        if (fnPath) {
            const {returnType} = fnPath.node;
            
            if (returnType) {
                const {name} = returnType.typeAnnotation.typeName;
                
                fnPath.__ishvara_return_type = name;
                delete fnPath.node.returnType;
                
                const reg = getReg(name);
                
                return '';
            }
        }
        
        return '';
    },
});
