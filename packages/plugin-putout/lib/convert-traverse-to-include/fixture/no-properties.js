module.exports.traverse = ({push}) => {
    return {
        'Identifier': push,
    }
};

