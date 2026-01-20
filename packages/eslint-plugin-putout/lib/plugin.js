import {createPlugin} from '@putout/eslint/create-plugin';
import * as arrayElementNewline from './array-element-newline/index.js';
import * as singlePropertyDestructuring from './single-property-destructuring/index.js';
import * as multiplePropertiesDestructuring from './multiple-properties-destructuring/index.js';
import * as forOfMultiplePropertiesDestructuring from './for-of-multiple-properties-destructuring/index.js';
import * as longPropertiesDestructuring from './long-properties-destructuring/index.js';
import * as destructuringAsFunctionArgument from './destructuring-as-function-argument/index.js';
import * as alignSpaces from './align-spaces/index.js';
import * as newlineFunctionCallArguments from './newline-function-call-arguments/index.js';
import * as functionDeclarationParenNewline from './function-declaration-paren-newline/index.js';
import * as addNewlinesBetweenTypesInUnion from './add-newlines-between-types-in-union/index.js';
import * as addNewlinesBetweenSpecifiers from './add-newlines-between-specifiers/index.js';
import * as addNewlineBeforeReturn from './add-newline-before-return/index.js';
import * as addNewlineBeforeFunctionCall from './add-newline-before-function-call/index.js';
import * as addNewlineAfterFunctionCall from './add-newline-after-function-call/index.js';
import * as removeNewlineAfterDefaultImport from './remove-newline-after-default-import/index.js';
import * as removeNewlineFromEmptyObject from './remove-newline-from-empty-object/index.js';
import * as removeEmptyNewlineBeforeFirstSpecifier from './remove-empty-newline-before-first-specifier/index.js';
import * as removeEmptyNewlineAfterLastSpecifier from './remove-empty-newline-after-last-specifier/index.js';
import * as removeEmptyNewlineAfterLastElement from './remove-empty-newline-after-last-element/index.js';
import * as removeEmptySpecifiers from './remove-empty-specifiers/index.js';
import * as objectsBracesInsideArray from './objects-braces-inside-array/index.js';
import * as objectPropertyNewline from './object-property-newline/index.js';
import * as removeDuplicateExtensions from './remove-duplicate-extensions/index.js';
import * as evaluate from './evaluate/index.js';
import * as tapeAddNewlineBeforeAssertion from './tape-add-newline-before-assertion/index.js';
import * as tapeAddNewlineBetweenTests from './tape-add-newline-between-tests/index.js';
import * as tapeRemoveNewlineBeforeTEnd from './tape-remove-newline-before-t-end/index.js';
import * as nonblockStatementBodyNewline from './nonblock-statement-body-newline/index.js';
import putout from './putout/index.js';
import removeEmptyNewlineAfterImport from './remove-empty-newline-after-import/index.js';
import removeEmptyNewlineBetweenDeclarations from './remove-empty-newline-between-declarations/index.js';

export const rules = {
    'putout': putout,
    'remove-empty-newline-after-import': removeEmptyNewlineAfterImport,
    'remove-empty-newline-between-declarations': removeEmptyNewlineBetweenDeclarations,
    
    'function-declaration-paren-newline': createPlugin(functionDeclarationParenNewline),
    'array-element-newline': createPlugin(arrayElementNewline),
    'single-property-destructuring': createPlugin(singlePropertyDestructuring),
    'multiple-properties-destructuring': createPlugin(multiplePropertiesDestructuring),
    'for-of-multiple-properties-destructuring': createPlugin(forOfMultiplePropertiesDestructuring),
    'long-properties-destructuring': createPlugin(longPropertiesDestructuring),
    'destructuring-as-function-argument': createPlugin(destructuringAsFunctionArgument),
    'align-spaces': createPlugin(alignSpaces),
    'newline-function-call-arguments': createPlugin(newlineFunctionCallArguments),
    'newlinene-function-call-arguments': createPlugin(functionDeclarationParenNewline),
    'add-newlines-between-types-in-union': createPlugin(addNewlinesBetweenTypesInUnion),
    'add-newlines-between-specifiers': createPlugin(addNewlinesBetweenSpecifiers),
    'add-newline-before-return': createPlugin(addNewlineBeforeReturn),
    'add-newline-before-function-call': createPlugin(addNewlineBeforeFunctionCall),
    'add-newline-after-function-call': createPlugin(addNewlineAfterFunctionCall),
    'remove-newline-after-default-import': createPlugin(removeNewlineAfterDefaultImport),
    'remove-newline-from-empty-object': createPlugin(removeNewlineFromEmptyObject),
    'remove-empty-newline-before-first-specifier': createPlugin(removeEmptyNewlineBeforeFirstSpecifier),
    'remove-empty-newline-after-last-specifier': createPlugin(removeEmptyNewlineAfterLastSpecifier),
    'remove-empty-newline-after-last-element': createPlugin(removeEmptyNewlineAfterLastElement),
    'remove-empty-specifiers': createPlugin(removeEmptySpecifiers),
    'objects-braces-inside-array': createPlugin(objectsBracesInsideArray),
    'object-property-newline': createPlugin(objectPropertyNewline),
    'remove-duplicate-extensions': createPlugin(removeDuplicateExtensions),
    'evaluate': createPlugin(evaluate),
    'tape-add-newline-before-assertion': createPlugin(tapeAddNewlineBeforeAssertion),
    'tape-add-newline-between-tests': createPlugin(tapeAddNewlineBetweenTests),
    'tape-remove-newline-before-t-end': createPlugin(tapeRemoveNewlineBeforeTEnd),
    'nonblock-statement-body-newline': createPlugin(nonblockStatementBodyNewline),
};
