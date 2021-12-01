const a: Function = () => {};
const b: any = 5;

merge(a, b);

function merge(a, b) {
    return [a, b];
}
