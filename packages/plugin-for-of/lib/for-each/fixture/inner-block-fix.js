module.exports = class ConfigCommentParser {

    /**
     * Parses a list of "name:string_value" or/and "name" options divided by comma or
     * whitespace. Used for "global" and "exported" comments.
     * @param {string} string The string to parse.
     * @param {Comment} comment The comment node which has the string.
     * @returns {Object} Result map object of names and string values, or null values if no value was provided
     */
    parseStringConfig(string, comment) {
        debug("Parsing String config");

        const items = {};

        // Collapse whitespace around `:` and `,` to make parsing easier
        const trimmedString = string.replace(/\s*([:,])\s*/gu, "$1");

        for (const name of trimmedString.split(/\s|,+/u)) {
            if (!name) {
                continue;
            }

            // value defaults to null (if not provided), e.g: "foo" => ["foo", null]
            const [key, value = null] = name.split(":");

            items[key] = { value, comment };
        }
        return items;
    }
}
