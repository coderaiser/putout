function t(e) {
    var n = [];
    
    return e instanceof Map ? e.forEach(function(e, o) {
        var i = e;
        ('object' === r(i) && (i = t(i)), n.push([o, i]));
    }) : Object
        .keys(e)
        .forEach(function(o) {});
};
