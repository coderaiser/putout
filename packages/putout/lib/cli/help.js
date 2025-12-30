import helpDescription from '../../help.json' with {
    type: 'json',
};

const {entries} = Object;

export const help = () => {
    const usage = 'Usage: putout [options] [path]';
    const result = [usage, 'Options: '];
    
    for (const [name, description] of entries(helpDescription)) {
        result.push(`   ${name} ${description}`);
    }
    
    return result.join('\n');
};
