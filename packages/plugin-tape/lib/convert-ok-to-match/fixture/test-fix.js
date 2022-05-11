t.match(message, /^Cannot read config file/);
t.match(body, /^ENOENT: no such file or directory/, 'should return error');
