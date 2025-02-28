module.exports.fix = ({path, lefts, right, merged}) => {
    if (merged) {
        const rightPath = path.get('right');
        const {right, left} = rightPath.node;
        const {object, property} = left;
    }
};
