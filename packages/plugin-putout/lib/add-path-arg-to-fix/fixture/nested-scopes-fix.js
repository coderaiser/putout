export const fix = (path) => {
    for (const element of path.node.elements) {
        console.log(compute(element));
    }
};
