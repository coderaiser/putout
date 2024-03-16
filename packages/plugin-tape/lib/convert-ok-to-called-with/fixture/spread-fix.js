const args = [token, '/', {
        order: 'asc',
        sort: undefined,
        root,
    }];

t.calledWith(readbox, args, 'should call readbox');
t.calledWith(readbox, args);
