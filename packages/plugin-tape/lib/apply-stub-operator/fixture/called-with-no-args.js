t.ok(paste.calledWith(), 'should paste files');
t.notOk(getCurrentName.called, 'should not call selectFile');
