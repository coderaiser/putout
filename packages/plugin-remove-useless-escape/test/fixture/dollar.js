const a = '\$\{';
const b = '\{';
const c = `grep -qF -- "\$(${nodeEncode})" ../README.md`;
