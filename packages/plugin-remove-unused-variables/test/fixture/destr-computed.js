const {[x]: y} = z;
const world = 'world';
const {
    hello: {
        [world]: {
            abc = {}
        } = {}
    }
} = x;
