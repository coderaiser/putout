'use strict';

const Ajv = require('ajv');
const schema = require('./schema.json');

const ajv = new Ajv({
    strict: true,
    allowUnionTypes: true,
});

const validate = ajv.compile(schema);

module.exports.validateOptions = (options) => {
    validate(options);
    
    const [error] = validate.errors || [];
    
    if (error)
        throw Error(`.putout.json: ${parsePath(error)}${parseAdditional(error)}${parseMessage(error)}${parseAllowed(error)}`);
};

function parseAllowed(error) {
    const {allowedValues} = error.params;
    
    if (!allowedValues)
        return '';
    
    return ` (${allowedValues.join('/')})`;
}

function parseMessage(error) {
    return error.message.replace(',', ' or ');
}

const parseAdditional = (error) => {
    const {additionalProperty} = error.params;
    
    if (!additionalProperty)
        return '';
    
    return `${additionalProperty}: `;
};

const parsePath = (error) => {
    const {instancePath} = error;
    
    if (!instancePath)
        return '';
    
    return `${error.instancePath.slice(1)}: `;
};
