'use strict';

const {jsonFormatter} = require('@putout/formatter-json');

module.exports = ({name, source, places, index, count, filesCount, errorsCount}) => {
    const json = jsonFormatter({
        name, source, places, index, count, filesCount, errorsCount,
    });
    
    if (!json)
        return '';
    
    if (!json.errors.length)
        return '';
    
    const output = [];
    for (const {name, places} of json.errors) {
        const messages = places.map(convertPlace);
        
        output.push({
            filePath: name,
            source,
            messages,
            errorCount: places.length,
            warningCount: 0,
            fixableErrorCount: places.length,
            fixableWarningCount: 0,
        });
    }
    
    return format(output);
};

function format(results) {
    const {ESLINT_FORMATTER} = process.env;
    
    if (ESLINT_FORMATTER)
        return require(`eslint-formatter-${ESLINT_FORMATTER}`)(results);
    
    return JSON.stringify(results, null, 4);
}

const severity = 2;

function convertPlace({rule, message, position}) {
    const {line, column} = position;
    
    return {
        ruleId: rule,
        severity,
        message,
        line,
        column,
        nodeType: '',
    };
}

