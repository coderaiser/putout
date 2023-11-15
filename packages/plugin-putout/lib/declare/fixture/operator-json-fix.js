import {operator} from 'putout';

const {__filesystem} = operator;
const {fromJS} = operator;
const {__ignore} = operator;
const {__yaml} = operator;
const {__json} = operator;
const {toJS} = operator;

toJS(source, __json);
toJS(source, __yaml);
toJS(source, __ignore);
fromJS(source, __filesystem);
