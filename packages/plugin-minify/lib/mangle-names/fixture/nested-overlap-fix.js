function a() {
    const A = document.getElementById('themeSwitcher');
}

function b() {
    if (!Cookies.get('theme')) {
        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            Cookies.set('theme', 'dark');
        } else {
            Cookies.set('theme', 'light');
        }
    }
    
    const _ = [];
    
    a();
}

function c() {
    const B = Cookies.get('theme') ?? 'dark';
    
    if (B === 'dark') {
        Cookies.set('theme', 'light');
        b();
    } else if (B === 'light') {
        Cookies.set('theme', 'dark');
        b();
    }
}

b();
