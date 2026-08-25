function onPUT({name, fs, moveFiles, config, body}, callback) {
    switch(cmd) {
    case 'copy':
        const [errorFrom, resolvedFrom] = tryCatch(root.resolve, files.from, rootDir);

        if (errorFrom)
            return callback(errorFrom);

        const [errorTo, resolvedTo] = tryCatch(root.resolve, files.to, rootDir);

        if (errorTo)
            return callback(errorTo);

        files.from = resolvedFrom;
        files.to = resolvedTo;

        copy(files.from, files.to, files.names, (error) => {
            const msg = formatMsg('copy', files.names);
            callback(error, msg);
        });
        break;
    }
}
