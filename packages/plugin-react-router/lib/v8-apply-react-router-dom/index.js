export const report = () => `Use 'react-router/dom' instead of 'react-router-dom'`;

export const replace = () => ({
    'import __imports from "react-router-dom"': 'import __imports from "react-router/dom"',
});
