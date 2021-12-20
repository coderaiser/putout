const freshImport = ((count) => (name) => import(`${name}?count=${++count}`))(0);
