export const fix = () => {
    for (const element of path.node.elements) {
        console.log(compute(element));
    }
};
