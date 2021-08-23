// Before
"lala".replaceAll(/(a)/g,'-$1-'); // Output: "l-a-l-a-"
// After
"lala".replaceAll(/a/g, "-$1-"); // Output: "l-$1-l-$1-"
