function createPrinter() {
    const getMainPrinter = () => mainPrinter;

    const traverse = createTraverse({
        maybeNewline,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        indent,
        write,
        debug,
        semantics,
        visitors,
        getMainPrinter,
    });

    const mainPrinter = freeze({
        indent,
        write,
        debug,
        maybe,
        quote,
        store: fullstore(),
        traverse,
    });
}
