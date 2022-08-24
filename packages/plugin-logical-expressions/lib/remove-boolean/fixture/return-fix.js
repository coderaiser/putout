function isJson(str) {
    try {
        return Boolean(JSON.parse(str));
    } catch (ex) {
        return false;
    }
}
