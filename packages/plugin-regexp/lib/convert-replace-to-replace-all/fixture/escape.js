line
    .replace(/\\'/g, `'`)
    .replace(/\\\//g, '/')
    .replace(/\\\+/g, '+')
    .replace(/\\\^/g, '^')
    .replace(/(\\),/, ',')
    .replace(/\\:/g, ':')
    .replace(/\+\\\//g, '+/')
    .replace(/\\,/g, ',');
