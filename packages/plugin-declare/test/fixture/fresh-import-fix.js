const freshImportDefault = (count => async name => (await import(`${name}?count=${++count}`)).default)(0);
const freshImport = (count => name => import(`${name}?count=${++count}`))(0);
freshImport('hello');
freshImportDefault('hello');
