{
    const {
        report,
        fix,
        scan,
    } = matchFiles({
        '*.cjs': plugin,
    });
    
    export {
        report,
        fix,
        scan,
    };
}
