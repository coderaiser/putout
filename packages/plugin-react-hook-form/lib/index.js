import * as v7ApplyFormState from './v7-apply-form-state/index.js';
import * as v6ApplyClearErrors from './v6-apply-clear-errors/index.js';
import * as v6ConvertAsToRender from './v6-convert-as-to-render/index.js';
import * as v6ConvertFormContextToFormProvider from './v6-convert-form-context-to-form-provider/index.js';
import * as v6ConvertTriggerValidationToTrigger from './v6-convert-trigger-validation-to-trigger/index.js';
import * as v5RemoveValueFromControl from './v5-remove-value-from-control/index.js';

export const rules = {
    'v7-apply-form-state': v7ApplyFormState,
    'v6-apply-clear-errors': v6ApplyClearErrors,
    'v6-convert-as-to-render': v6ConvertAsToRender,
    'v6-convert-form-context-to-form-provider': v6ConvertFormContextToFormProvider,
    'v6-convert-trigger-validation-to-trigger': v6ConvertTriggerValidationToTrigger,
    'v5-remove-value-from-control': v5RemoveValueFromControl,
};
