const notDeclaredRoot = (vars, path) => !path.scope.bindings.root;

export const match = () => ({
    'import __imports from "react-dom"': notDeclaredRoot,
    'render(__a, __b)': (vars, path) => {
        return notDeclaredRoot(vars, path);
    },
});
