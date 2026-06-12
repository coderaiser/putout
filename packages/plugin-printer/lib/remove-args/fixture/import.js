import {indent} from "./indent.js";

export const createStringLiteral = (value) => {
    return templateLiteral([
        templateElement({
            raw: indent(escapeRaw(value)),
            cooked: value,
        }),
    ], []);
};
