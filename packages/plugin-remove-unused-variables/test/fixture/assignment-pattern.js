const noop = () => {};
const _fn = (f = noop) => {
};

const {
    name = getName(),
} = {};

const def = ({fn = _fn} = {}) => {
};

