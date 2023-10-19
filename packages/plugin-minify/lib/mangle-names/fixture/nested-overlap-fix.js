function b() {
    const a = document.getElementById('themeSwitcher');
}

function B() {
    if (!Cookies.get('theme')) {
        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            Cookies.set('theme', 'dark');
        } else {
            Cookies.set('theme', 'light');
        }
    }
    
    const A = [];
    
    b();
}

function c() {
    const _ = Cookies.get('theme') ?? 'dark';
    
    if (_ === 'dark') {
        Cookies.set('theme', 'light');
        B();
    } else if (_ === 'light') {
        Cookies.set('theme', 'dark');
        B();
    }
}

B();
