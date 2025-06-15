import {operator} from 'putout';

const {declare} = operator;

test(': nested-labels', (t) => {
    t.transform('nested-labels');
});

test(': nested-labels', (t) => {
    t.transform('nested-labels', {
        declare,
    });
});

t.transform('nested-labels', {});
