const args = [token, '/', {
    order: 'asc',
    sort: undefined,
    root,
}];

t.ok(readbox.calledWith(...args), 'should call readbox');
t.ok(readbox.calledWith(...args));
