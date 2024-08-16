

module.exports = [
    ...safeAlign, {
        rules: {},
    },
];

module.exports = [
    ...safeAlign, {
        files: ["src/**/*.js"],
        rules: {},
    },
];

module.exports = [
    ...safeAlign, {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js"],
        ...a,
        rules: {},
    },
];

module.exports = [
    ...safeAlign, {
        rules: {
            "node/no-unsupported-features/node-builtins": "off"
        },
    },
];

const a = {};