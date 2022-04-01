const chooseName = (name, resolvedName) => !isIDE ? name : resolvedName;
const isIDE = /JetBrains/.test(env.TERMINAL_EMULATOR) || env.TERM_PROGRAM === 'vscode';

