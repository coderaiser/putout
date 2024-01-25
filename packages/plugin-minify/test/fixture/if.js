let a = 0;

if (Math.random() > 0.5)
    a++;
else
    a--;

if (a)
    if (b)
        log('a and b are truthy');
    else
        log('a is truthy, b is falsy');

