export default () => {
    useEffect(() => {
        (async () => {
            const t = await fs.promises.readFile('hello');
        })();
    });
};

export const hello = () => {
    useEffect(function() {
        (async function() {
            const t = await fs.promises.readFile('hello');
        })();
    });
};

