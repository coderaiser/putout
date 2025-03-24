import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use 'trigger()' instead of 'triggerValidation()'`;

export const fix = (path) => {
    rename(path, 'triggerValidation', 'trigger');
};

export const include = () => [
    'triggerValidation(__args)',
];

export const filter = ({scope}) => {
    const bindings = scope.getAllBindings();
    return bindings.triggerValidation;
};
