import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use '<FormProvider/>' instead of '<FormContext/>'`;

export const fix = (path) => {
    rename(path, 'FormContext', 'FormProvider');
};

export const include = () => [
    '<FormContext __jsx_attributes>__jsx_children</FormContext>',
];

export const filter = (path) => path.scope.getAllBindings().FormContext;
