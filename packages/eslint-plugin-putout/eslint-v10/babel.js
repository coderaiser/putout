/**
 * @fileoverview Wrapper around @babel-eslint/parser to make it work with ESLint v10.
 * @author Milos Djermanovic
 */
//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------
import * as eslintScope from 'eslint-scope';
import babelESLintParser from '@babel/eslint-parser/experimental-worker';

//------------------------------------------------------------------------------
// Type Definitions
//------------------------------------------------------------------------------

/** @typedef {import("eslint-scope").ScopeManager} ScopeManager */
//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Add global variables and resolve references to all global variables.
 * @this {ScopeManager}
 * @param {string[]} names Names of global variables to add.
 * @returns {void}
 */
function addGlobals(names) {
    const [globalScope] = this.scopes;
    
    for (const name of names) {
        let variable = globalScope.set.get(name);
        
        /* c8 ignore start */
        if (variable)
            continue;
        
        /* c8 ignore start */
        variable = new eslintScope.Variable(name, globalScope);
        
        globalScope.variables.push(variable);
        globalScope.set.set(name, variable);
    }
    
    /*
	 * "through" contains all references which definitions cannot be found.
	 * Since we augment the global scope we need to update references
	 * and remove the ones that were added.
	 *
	 * Also, babel-eslint's scope manager doesn't resolve references
	 * to global `var` and `function` variables, so we'll resolve _all_
	 * references to variables that exist in the global scope.
	 */
    globalScope.through = globalScope.through.filter((reference) => {
        const {name} = reference.identifier;
        const variable = globalScope.set.get(name);
        
        if (variable) {
            /*
			 * Links the variable and the reference.
			 * And this reference is removed from `Scope#through`.
			 */
            reference.resolved = variable;
            variable.references.push(reference);
            
            return false;
        }
        
        return true;
    });
    
    /*
	 * "implicit" contains information about implicit global variables (those created
	 * implicitly by assigning values to undeclared variables in non-strict code).
	 * Since we augment the global scope, we need to remove the ones that were added.
	 */
    const {implicit} = globalScope;
    
    /* c8 ignore start */
    implicit.variables = implicit.variables.filter(({name}) => {
        if (globalScope.set.has(name)) {
            implicit.set.delete(name);
            return false;
        }
        
        return true;
    });
    /* c8 ignore end */
    // babel-eslint's scope manager doesn't produce "implicit.left"
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export default {
    ...babelESLintParser,
    parseForESLint(...args) {
        const retv = babelESLintParser.parseForESLint(...args);
        
        retv.scopeManager.addGlobals = addGlobals;
        
        return retv;
    },
};
