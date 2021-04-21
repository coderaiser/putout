
module.exports.filter = (path) => {
    const {node} = path;
    const {body} = node;
    const [first] = body.body;
    const {__i} = getTemplateValues(node, 'for (let __i = 0; __i < __n; __i++) __c');
    
    return compare(first, `const __a = __b[${__i.name}]`);
};
