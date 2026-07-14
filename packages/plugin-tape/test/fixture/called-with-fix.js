{
    const result = fn.calledWith(a);
    t.ok(result);
}
t.calledWith(fn, [a, b]);
{
    const result = fn.calledWith(...a);
    t.ok(result);
}
t.calledWith(fn, a, 'x');
