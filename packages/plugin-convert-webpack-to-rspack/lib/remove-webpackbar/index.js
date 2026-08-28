export const report = () => `Remove 'WebpackBar'`;

export const replace = () => ({
    'import WebpackBar from "webpackbar"': '',
    'new WebpackBar()': '',
});
