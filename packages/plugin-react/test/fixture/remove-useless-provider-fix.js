function App() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <UseTheme value={theme}>
            <Page/>
        </UseTheme>
    );
}

function App1() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <Provider value={theme}>
            <Page/>
        </Provider>
    );
}

function App2() {
    const [theme, setTheme] = useState('light');
    
    // ...
    return (
        <Provider.Hello value={theme}>
            <Page/>
        </Provider.Hello>
    );
}
