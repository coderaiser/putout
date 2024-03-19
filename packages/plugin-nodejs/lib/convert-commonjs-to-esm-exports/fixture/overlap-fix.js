export const enter = RegExp(`madrun\\s|redrun\\s|(npm (${run}|${reserved}|${reservedTest}))`);
export const arg = RegExp(`npm ${run} (${arg})+`, 'g');
export const name = RegExp(`(${scriptName})+`);
export const reserved = RegExp(`npm (${reserved})`);
export const reservedTest = RegExp(`^npm ${reservedTest}$`);
export const redrun = RegExp(`(npx\\s)?redrun(\\s|${redrunArg}|${scriptName}|${redrunEnd})+`);
export const madrun = RegExp(`(npx\\s)?madrun\\s(${redrunArg}|${scriptName}|${redrunEnd})+`);
export const redrunEnd = RegExp(`\\s+(${redrunEnd}).*`);
module.exports.cli = cli();

function cli() {}
