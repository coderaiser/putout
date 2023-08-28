export const report = () => `Use 'createPlugin()' instead of 'wrap()'`;

export const replace = () => ({
    'const wrap = require("../wrap")': (vars, path) => {
        path.scope.rename('wrap', 'createPlugin');
        return 'const {createPlugin} = require("@putout/eslint/create-plugin")';
    },
});
