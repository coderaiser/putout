{
    const {
        report,
        fix,
        scan,
    } = renameFiles({
        type: 'module',
        mask: '*.mjs',
        rename(name) {
            return name.replace(/mjs$/, 'js');
        },
    });
    
    export {
        report,
        fix,
        scan,
    };
}
