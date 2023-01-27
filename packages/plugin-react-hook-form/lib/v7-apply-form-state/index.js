'use strict';

module.exports.report = () => `Use 'formState.errors' instead of 'errors'`;

module.exports.replace = () => ({
    'const { errors } = useForm()': 'const { formState: { errors } } = useForm()',
});
