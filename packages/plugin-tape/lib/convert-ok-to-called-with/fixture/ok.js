t.ok(set.calledWith(1, 2, 3, 4));
t.ok(readbox.calledWith(token , '/'), 'should call readbox');
t.ok(readbox.calledWith(...args), 'should call readbox');
t.ok(readbox.calledWith(...args));
