t.calledWith(set, [
    1,
    2,
    3,
    4,
]);
t.calledWith(readbox, [token, '/'], 'should call readbox');
t.calledWith(readbox, args, 'should call readbox');
t.calledWith(readbox, args);
