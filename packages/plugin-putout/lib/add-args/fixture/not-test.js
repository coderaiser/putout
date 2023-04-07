module.exports.traverse = () => ({
    Identifier(path) {
        comparePlaces();
    },
});
