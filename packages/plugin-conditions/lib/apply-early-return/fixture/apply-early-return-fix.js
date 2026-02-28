function get() {
    if (a) {
        x();
        return;
    } else {
        b();
    }
}

function get2() {
    if (a) {
        x();
    } else {
        b();
    }
    
    const x = 3;
}

function notBlock() {
    if (a)
        x();
    else
        b();
    
    const x = 3;
}

function notBlockNoNext() {
    if (a) {
        x();
        return;
    } else
        b();
}

if (a) {
    x();
} else {
    b();
}
