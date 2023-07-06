'use strict';

module.exports.createUpdate = (UPDATE = process.env.UPDATE) => (...args) => {
    process.env.UPDATE = args.length ? args[0] : UPDATE;
};
