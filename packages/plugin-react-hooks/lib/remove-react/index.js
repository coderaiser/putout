const reactNotUsed = (vars, path) => !path.scope.bindings.React?.referencePaths?.length;
const isReactUsed = (path) => path.scope.bindings.React?.referencePaths?.length;

export const report = () => `Remove unused 'React' variable`;
export const match = () => ({
    'import * as React from "react"': reactNotUsed,
    'import React from "react"': reactNotUsed,
    'import __imports from "react"': ({__imports}, path) => {
        if (isReactUsed(path))
            return false;
        
        return __imports[0]?.local?.name === 'React';
    },
});

export const replace = () => ({
    'import * as React from "react"': '',
    'import React from "react"': '',
    'import __imports from "react"'({__imports}, path) {
        __imports.shift();
        return path;
    },
});
