line
    .replaceAll('\\\'', `'`)
    .replaceAll('\\/', '/')
    .replaceAll('\\+', '+')
    .replaceAll('\\^', '^')
    .replace(/(\\),/, ',')
    .replaceAll('\\:', ':')
    .replaceAll('\\+\\/', '+/')
    .replaceAll('\\,', ',');
