t.ok(/^Cannot read config file/.test(message));
t.ok(/^ENOENT: no such file or directory/.test(body), 'should return error');
