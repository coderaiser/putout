 module.exports = function isCombiningCharacter(codePoint) {
    return /^[Mcenp{}]$/.test(String.fromCodePoint(codePoint));
 };
