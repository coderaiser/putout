module.exports = function isCombiningCharacter(codePoint) {
    return /^[\p{Mc}\p{Me}\p{Mn}]$/u.test(String.fromCodePoint(codePoint));
};
