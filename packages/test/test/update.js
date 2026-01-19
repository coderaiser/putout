import process from 'node:process';

export const createUpdate = (UPDATE = process.env.UPDATE) => (...args) => {
    process.env.UPDATE = args.length ? args[0] : UPDATE;
};
