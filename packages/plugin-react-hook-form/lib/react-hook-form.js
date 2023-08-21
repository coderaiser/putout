'use strict';

const v7ApplyFormState = require('./v7-apply-form-state');
const v6ApplyClearErrors = require('./v6-apply-clear-errors');
const v6ConvertAsToRender = require('./v6-convert-as-to-render');
const v6ConvertFormContextToFormProvider = require('./v6-convert-form-context-to-form-provider');
const v6ConvertTriggerValidationToTrigger = require('./v6-convert-trigger-validation-to-trigger');
const v5RemoveValueFromControl = require('./v5-remove-value-from-control');

module.exports.rules = {
    'v7-apply-form-state': v7ApplyFormState,
    'v6-apply-clear-errors': v6ApplyClearErrors,
    'v6-convert-as-to-render': v6ConvertAsToRender,
    'v6-convert-form-context-to-form-provider': v6ConvertFormContextToFormProvider,
    'v6-convert-trigger-validation-to-trigger': v6ConvertTriggerValidationToTrigger,
    'v5-remove-value-from-control': v5RemoveValueFromControl,
};
