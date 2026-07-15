export const createParseStep = (name) => (step) => {
    const properties = step.get('properties');
    
    for (const prop of properties) {
        const key = prop.get('key.value').node;
        
        if (key === name)
            return prop.get('value.value').node;
    }
    
    return '';
};
