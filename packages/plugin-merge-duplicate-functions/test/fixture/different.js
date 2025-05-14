const a = async () => true;
const b = async () => {};

const c = async () => throw Error('hello');

const d = async () => {
    throw Error('hello');
};

export const use32 = () => {};
export const use16 = () => {};
