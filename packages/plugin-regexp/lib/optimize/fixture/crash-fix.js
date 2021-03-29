 module.exports = function isCombiningCharacter(codePoint) {
    return /^[Mcen\p{}]$/u.test(String.fromCodePoint(codePoint));
 };
