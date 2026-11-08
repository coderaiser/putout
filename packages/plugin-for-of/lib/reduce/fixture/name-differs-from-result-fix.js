export const f = (rules) => {
    {
        let rulesMs = 0;
        
        for (const {total} of rules) {
            rulesMs = rulesMs + total;
        }
    }
    
    return rulesMs;
};
