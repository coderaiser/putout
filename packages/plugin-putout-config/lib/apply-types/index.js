'use strict';

const {createRenameProperty} = require('../rename-property');

module.exports = createRenameProperty([
    ['convert-typeof-to-is-type', 'types/convert-typeof-to-is-type'],
    ['remove-useless-type-conversions', 'types/remove-useless-type-conversions'],
    ['remove-useless-typeof', 'types/remove-useless-typeof'],
    ['apply-is-array', 'types/apply-is-array'],
    ['remove-useless-type-conversion/with-double-negations', 'types/remove-double-negations'],
]);
