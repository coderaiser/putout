function isNewLine(code) {
    return code === 10
        || code === 13
        || code === 0x2028
        || code === 0x2029;
}
