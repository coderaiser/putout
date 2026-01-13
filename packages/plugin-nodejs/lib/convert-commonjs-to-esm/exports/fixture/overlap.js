module.exports.enter = RegExp(`madrun\\s|redrun\\s|(npm (${run}|${reserved}|${reservedTest}))`);
module.exports.arg = RegExp(`npm ${run} (${arg})+`, 'g');
module.exports.name = RegExp(`(${scriptName})+`);
module.exports.reserved = RegExp(`npm (${reserved})`);
module.exports.reservedTest = RegExp(`^npm ${reservedTest}$`);
module.exports.redrun = RegExp(`(npx\\s)?redrun(\\s|${redrunArg}|${scriptName}|${redrunEnd})+`);
module.exports.madrun = RegExp(`(npx\\s)?madrun\\s(${redrunArg}|${scriptName}|${redrunEnd})+`);
module.exports.redrunEnd = RegExp(`\\s+(${redrunEnd}).*`);
module.exports.cli = cli();

function cli() {
}
