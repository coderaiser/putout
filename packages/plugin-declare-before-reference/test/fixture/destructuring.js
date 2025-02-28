module.exports.fix = ({path, lefts, right, merged}) => {
    if (merged) {
        const rightPath = path.get('right');
        const {object, property} = left;
        const {right, left} = rightPath.node;
    }
}
