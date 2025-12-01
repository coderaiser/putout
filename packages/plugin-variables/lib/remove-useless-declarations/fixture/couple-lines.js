const code = '\n' + currentSource
    .split('\n')
    .map(addSpaces(spacesCount))
    .join('\n') +
'\n' + lastLine;

return code;
