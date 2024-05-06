function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <UseTheme.Provider value={theme}>
      <Page />
    </UseTheme.Provider>
  );
}

function App1() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <Provider value={theme}>
      <Page />
    </Provider>
  );
}

function App2() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <Provider.Hello value={theme}>
      <Page />
    </Provider.Hello>
  );
}