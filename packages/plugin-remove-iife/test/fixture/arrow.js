(() => {fn()})();
((a) => fn(a))(value);
((a, b) => fn(a, b))(value, value2);
((a, b, c) => fn(a, b, c))(value, value2, value3);
