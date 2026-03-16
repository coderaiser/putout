import * as reverseComparisonInTypeChecker from './reverse-comparison-in-type-checker/index.js';
import * as removeUselessNotFromTypeChecker from './remove-useless-not-from-type-checker/index.js';
import * as removeUselessColonFromTypeChecker from './remove-useless-colon-from-type-checker/index.js';
import * as addMissingColonToTypeChecker from './add-missing-colon-to-type-checker/index.js';
import * as mergeTuplesOfTypeCheckers from './merge-tuples-of-type-checkers/index.js';
import * as checkIfSuccessPossibleInTypeChecker from './check-if-success-possible-in-type-checker/index.js';
import * as removeUselessTuplesFromTypeChecker from './remove-useless-tuples-from-type-checker/index.js';
import * as addMissingTuplesToTypeChecker from './add-missing-tuples-to-type-checker/index.js';
import * as checkTypePassedToTypeChecker from './check-type-passed-to-type-checker/index.js';
import * as removeUselessSpacesFromTypeChecker from './remove-useless-spaces-from-type-checker/index.js';
import * as addMissingSpacesToTypeChecker from './add-missing-spaces-to-type-checker/index.js';
import * as removeTrailingSpacesFromTypeChecker from './remove-trailing-spaces-from-type-checker/index.js';
import * as removeUselessMaybe from './remove-useless-maybe/index.js';
import * as applyCreateTestUrl from './apply-create-test-url/index.js';
import * as removeArgs from './remove-args/index.js';
import * as applyBreakline from './apply-breakline/index.js';
import * as applyLinebreak from './apply-linebreak/index.js';
import * as applyComputedPrint from './apply-computed-print/index.js';
import * as addArgs from './add-args/index.js';
import * as declare from './declare/index.js';
import * as applyTypes from './apply-types/index.js';
import * as removeLegacyTestDeclaration from './remove-legacy-test-declaration/index.js';

export const rules = {
    'remove-args': removeArgs,
    'apply-breakline': applyBreakline,
    'apply-linebreak': applyLinebreak,
    'apply-computed-print': applyComputedPrint,
    'add-args': addArgs,
    declare,
    'apply-types': applyTypes,
    'remove-legacy-test-declaration': removeLegacyTestDeclaration,
    'apply-create-test-url': applyCreateTestUrl,
    'remove-useless-maybe': removeUselessMaybe,
    'remove-trailing-spaces-from-type-checker': removeTrailingSpacesFromTypeChecker,
    'add-missing-spaces-to-type-checker': addMissingSpacesToTypeChecker,
    'remove-useless-spaces-from-type-checker': removeUselessSpacesFromTypeChecker,
    'check-type-passed-to-type-checker': checkTypePassedToTypeChecker,
    'add-missing-tuples-to-type-checker': addMissingTuplesToTypeChecker,
    'remove-useless-tuples-from-type-checker': removeUselessTuplesFromTypeChecker,
    'check-if-success-possible-in-type-checker': checkIfSuccessPossibleInTypeChecker,
    'merge-tuples-of-type-checkers': mergeTuplesOfTypeCheckers,
    'add-missing-colon-to-type-checker': addMissingColonToTypeChecker,
    'remove-useless-colon-from-type-checker': removeUselessColonFromTypeChecker,
    'remove-useless-not-from-type-checker': removeUselessNotFromTypeChecker,
    'reverse-comparison-in-type-checker': reverseComparisonInTypeChecker,
};
