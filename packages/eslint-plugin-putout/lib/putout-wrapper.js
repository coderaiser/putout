'use strict';
module.exports = () => {
    try {
        const putout = require('putout');
        return putout;
    } catch (e) {
        throw e;
    }
};