const comparators = [
    compareAny,
    compareAll,
];

export const run = (node, template, options) => {
    const first = compareAny(node, template);
    
    for (const compare of comparators) {
        if (compare(node, template, options))
            return true;
    }
    
    return first;
};

function compareAny(node, template) {
    return template === '__';
}

function compareAll(node, template) {
    return node === template;
}
