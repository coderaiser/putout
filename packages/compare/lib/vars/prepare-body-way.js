'use strict';

const TS_MODULE_REG = /\.body\.0\.expression$/;
const CLASS_BODY_REG = /\.body\.0\.key$/;
const BODY_REG = /\.body\.0$/;

module.exports.prepareBodyWay = (way) => {
    return way
        .replace(TS_MODULE_REG, '')
        .replace(CLASS_BODY_REG, '')
        .replace(BODY_REG, '');
};
