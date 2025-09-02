const y = async () => {
    throw Error('x');
};
const z = () => Promise.reject(Error('x'));
