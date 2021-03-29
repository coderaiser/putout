 module.exports = function isCombiningCharacter(codePoint) {
    return /^[Mcenp{}]$/u.test(String.fromCodePoint(codePoint));
 };
