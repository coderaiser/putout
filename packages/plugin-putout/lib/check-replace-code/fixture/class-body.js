module.exports.replace = () => ({
    'export class __a {__body}': 'module.exports.__a = class __a {__body}',
});
