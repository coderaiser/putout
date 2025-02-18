export default (places) => {
    for (const {rule} of places) {
        if (rule === 'eslint/parser')
            return true;
    }
    
    return false;
};
