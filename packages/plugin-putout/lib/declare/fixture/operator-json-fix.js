import {operator} from 'putout';

const {__filesystem} = operator;
const {fromJS} = operator;
const {__json} = operator;
const {toJS} = operator;

toJS(source, __json);
fromJS(source, __filesystem);
