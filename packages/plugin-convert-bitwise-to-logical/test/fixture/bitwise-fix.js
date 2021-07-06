module.exports.isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);
