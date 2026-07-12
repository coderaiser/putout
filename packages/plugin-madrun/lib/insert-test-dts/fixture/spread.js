export default {
    ...typescriptESLintParser,
    parseForESLint(...args) {
        const retv = typescriptESLintParser.parseForESLint(...args);
        
        retv.scopeManager.addGlobals = addGlobals;
        
        return retv;
    },
};
