module.exports.replace = () => ({
    'module.exports.traverse = __a': ({}, path) => {
        const bodyPath = path.get('right.body');
        
        if (!bodyPath.isBlockStatement()) {
        }
    }
});

