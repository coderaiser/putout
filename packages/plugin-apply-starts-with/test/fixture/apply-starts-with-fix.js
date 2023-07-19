function x(a = '') {
    if (a.startsWith('1'))
        return false;
}

function x1({b = m, a = ''}) {
    if (!a.indexOf('1'))
        return false;
}

function x2() {
    var {a = ''} = z;
    
    if (a.startsWith('1'))
        return false;
}

function x3() {
    var a = z;
    
    if (!a.indexOf('1'))
        return false;
}
