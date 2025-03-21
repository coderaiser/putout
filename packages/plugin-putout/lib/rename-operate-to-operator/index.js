import {operator} from 'putout';

const {rename} = operator;

export const report = () => '"operator" should be used instead of "operate"';

export const include = () => ['Program'];

export const filter = (path) => {
    const noOperator = !path.scope.bindings.operator;
    const yesOperate = path.scope.bindings.operate;
    
    return noOperator && yesOperate;
};

export const fix = (path) => {
    rename(path, 'operate', 'operator');
};
