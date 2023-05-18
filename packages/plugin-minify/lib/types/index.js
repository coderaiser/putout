'use strict';

module.exports.report = () => `Use minified types`;

module.exports.replace = () => ({
    'undefined': 'void 0',
    'true': '!0',
    'false': '!1',
    'Boolean(__a)': '!!__a',
    'String(__a)': '"" + __a',
    'Number(__a)': '+__a',
    'typeof __a === "undefined"': '__a == undefined',
    'typeof __a !== "undefined"': '__a !== undefined',
});
