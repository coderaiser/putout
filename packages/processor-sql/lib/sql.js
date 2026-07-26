import {
    toJS,
    fromJS,
    __sql,
} from '@putout/operator-json';
import {convertJsToSql, convertSqlToJs} from 'happy-sql';

export const files = ['*.sql'];

export const branch = (rawSource) => {
    const list = [{
        startLine: 0,
        source: toJS(convertSqlToJs(rawSource), __sql),
        extension: 'js',
    }];
    
    return list;
};

export const merge = (rawSource, list) => {
    const [sqlJs] = list;
    return convertJsToSql(fromJS(sqlJs, __sql));
};
