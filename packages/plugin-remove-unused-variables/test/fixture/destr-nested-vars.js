const obj = {
    hello: {
        world: 'hi',
    }
};

const {
    hello: {
        world,
    },
} = obj;

const defaultProcessors = [];
const [error, {
    processors = defaultProcessors,
}] = getOptions();
