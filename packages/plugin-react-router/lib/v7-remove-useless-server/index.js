export const report = () => `'react-router-dom/server' -> 'react-router-dom'`;

export const replace = () => ({
    'import {StaticRouter} from "react-router-dom/server"': 'import {StaticRouter} from "react-router-dom"',
});
