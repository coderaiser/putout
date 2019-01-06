const isOne = true;
const x = isOne ? 1 : 0;
const y = x && true ? 0 : 1;

function tmpl() {
    const {host, origin, protocol} = location;
    return origin || `${protocol}//${host}`;
}

