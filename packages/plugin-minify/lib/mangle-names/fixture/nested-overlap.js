function updateButtonTheme() {
    const themeSwitcher = document.getElementById('themeSwitcher');
}

function updateTheme() {
    if (!Cookies.get('theme')) {
        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            Cookies.set('theme', 'dark');
        } else {
            Cookies.set('theme', 'light');
        }
    }

    const vars = [
    ]
    
    updateButtonTheme();
}

function swapTheme() {
    const theme = Cookies.get('theme') ?? 'dark';
    if (theme === 'dark') {
        Cookies.set('theme', 'light');
        updateTheme();
    } else if (theme === 'light') {
        Cookies.set('theme', 'dark');
        updateTheme();
    }
}

updateTheme();
