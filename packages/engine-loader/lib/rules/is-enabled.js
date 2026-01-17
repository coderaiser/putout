export const isEnabled = (name, rules) => {
    for (const {rule, state} of rules) {
        if (rule === name)
            return state;
    }
    
    for (const {rule, state} of rules) {
        if (rule.includes('/') && name.startsWith(rule))
            return state;
    }
    
    for (const {rule, state} of rules) {
        if (name.startsWith(`${rule}/`))
            return state;
    }
    
    return true;
};
