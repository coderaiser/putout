t.equal(error.message, `☝️ Looks like directory '/hello/world/' is missing`);
t.equal(error?.message, `☝️ Looks like provided to 'matchFiles()' typeof of plugin is not an 'object' but 'string'`);
