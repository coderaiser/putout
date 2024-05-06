'use strict';

module.exports.report = () => `Remove implicit 'ref' return`;

module.exports.replace = () => ({
    '<div ref={__a => (__b = __a)} />': '<div ref={__a=> {__b= __a}} />',
});
