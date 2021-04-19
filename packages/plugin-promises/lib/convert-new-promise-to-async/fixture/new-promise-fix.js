async function get() {
    {
        if (a > b)
            return 'hello';

        throw Error("Cannot get");
    }
}

