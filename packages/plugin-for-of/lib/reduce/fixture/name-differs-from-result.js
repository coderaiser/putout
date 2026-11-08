export const f = (rules) => {
    const rulesMs = rules.reduce((sum, {total}) => sum + total, 0);
    
    return rulesMs;
};
