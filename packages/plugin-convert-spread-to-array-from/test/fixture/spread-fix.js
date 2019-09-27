const places = Array.from(runPlugins({
    ast,
    shebang,
    fix,
    fixCount,
    plugins,
    parser,
}));
