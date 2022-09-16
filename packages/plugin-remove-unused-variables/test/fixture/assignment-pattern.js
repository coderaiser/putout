const noop = () => {};
const _fn = (f = noop) => {
};

const {
    name = getName(),
} = {};

const def = ({fn = _fn} = {}) => {
};

const rename = ({obj: obj2 = null} = {}) => {
    return {
        obj2
    };
};

