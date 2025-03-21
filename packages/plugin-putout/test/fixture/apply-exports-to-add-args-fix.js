import {operator} from 'putout';

const {addArgs} = operator;
{
    const {
        report,
        fix,
        traverse,
    } = addArgs(__args);
    export {
        report,
        fix,
        traverse,
    };}
