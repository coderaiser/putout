const x = getTemplateValues(path.parentPath, '__a * __b');

export const match = () => ({
    'if (!__a) __b': ({__a, __b}, path) => {
        const {parentPath} = path.parentPath;
        const {argument} = __a;
        
        console.log(getTemplateValues(parentPath, 'while (__c = __d) __body'), 'x');
        
        return compare(parentPath, `while (${argument.name} = __d) __body`);
    }
});
