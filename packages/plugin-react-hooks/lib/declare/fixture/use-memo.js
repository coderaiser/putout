function Example() {
  const [count, setCount] = useState(0);
  const fn = useMemo(() => {});

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  
  return (<div/>);
}

