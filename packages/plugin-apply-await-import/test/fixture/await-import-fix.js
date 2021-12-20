const a = async () => {
    {
        const b = await import('y');
    }
};

const z = await import('z');

const f = async () => {
    const z = await import('b');
};

