function isJson(str) {
    try {
        return JSON.parse(str) && true;
    } catch (ex) {
        return false;
    }
}
