if (!matchFn)
    fix(from, to, path);
else if (matchFn(options))
    fix(from, to, path);