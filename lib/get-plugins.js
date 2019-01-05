const {join} = require('path');

module.exports = () => {
    const addDir = (a) => join(__dirname, '..', 'lib', a);
    const {plugins} = require('../putout.json');
    
    return plugins
        .map(addDir)
        .map(require);
};

