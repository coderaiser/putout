type More = Pick<Hello, Exclude<keyof Hello, World>>;
