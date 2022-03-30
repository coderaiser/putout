import {jsonFormatter} from '@putout/formatter-json';

export default async ({name, source, places, index, count, filesCount, errorsCount}) => {
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
    
    return await format(output);
};

async function format(results) {
    const {ESLINT_FORMATTER} = process.env;
    
    if (ESLINT_FORMATTER) {
        const eslintFormatter = await import(`eslint-formatter-${ESLINT_FORMATTER}`);
        return await eslintFormatter.default(results);
    }
    
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

