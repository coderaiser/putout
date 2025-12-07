/^\w+\//;
/^\w+\\\//;

log(/^(babel|jscodeshift)\//.test(rule));
/\\\//g.test(raw) && !/\\\\\//g.test(raw);
