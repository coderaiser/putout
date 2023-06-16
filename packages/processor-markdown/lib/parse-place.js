export function toPlace({reason, line, column, source, ruleId}) {
    const {message, rule} = parseWatermark({
        reason,
        ruleId,
        source,
    });
    
    return {
        message,
        rule,
        position: {
            line,
            column,
        },
    };
}

function parseWatermark({reason, ruleId, source}) {
    const [watermark, remarkRule, message] = reason.split(': ');
    
    if (watermark === 'putout') {
        const rule = `${remarkRule} (${source})`;
        
        return {
            rule,
            message,
        };
    }
    
    return {
        message: reason,
        rule: `${ruleId} (${source})`,
    };
}
