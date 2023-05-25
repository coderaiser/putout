await minify();

function readStd(callback, options) {
    const {stdin} = process;
    let chunks = '';

    const read = () => {
        const chunk = stdin.read();

        if (chunk)
            return chunks += chunk;

        stdin.removeListener('readable', read);
        callback(chunks, options);
    };

    stdin.setEncoding('utf8');
    stdin.addListener('readable', read);
}

async function minify() {
    if (!In || /^(-h|--help)$/.test(In))
        return help();

    if (/^(-v|--version)$/.test(In))
        return log(`v${Version}`);

    const {readOptions} = await import('../lib/read-options.mjs');
    const [optionsError, options] = await tryToCatch(readOptions);

    if (optionsError)
        return log.error(optionsError.message);

    if (a)
        return readStd(processStream, options);

    await uglifyFiles(files, options);
}
