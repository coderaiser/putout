'use strict';

const reactNotUsed = (vars, path) => !path.scope.bindings.React?.referencePaths?.length;
const isReactUsed = (path) => path.scope.bindings.React?.referencePaths?.length;

module.exports.report = () => `Remove unused 'React' variable`;
module.exports.match = () => ({
    'import * as React from "react"': reactNotUsed,
    'import React from "react"': reactNotUsed,
    'import __imports from "react"': ({__imports}, path) => {
        if (isReactUsed(path))
            return false;
        
        return __imports[0]?.local?.name === 'React';
    },
});
module.exports.replace = () => ({
    'import * as React from "react"': '',
    'import React from "react"': '',
    'import __imports from "react"'({__imports}, path) {
        __imports.shift();
        return path;
    },
});
