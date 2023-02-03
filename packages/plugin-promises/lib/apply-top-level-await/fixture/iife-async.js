export default () => {
    useEffect(async () => {
        (async () => {
            const t = await fs.promises.readFile('hello');
        })();
    });
};

export const hello = () => {
    useEffect(async function() {
        (async function() {
            const t = await fs.promises.readFile('hello');
        })();
    });
};

