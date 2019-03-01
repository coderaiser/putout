function world({x, y, ...z}) {
    console.log(z);
}

const f = ({ setState, isValidated, ...rest }) => ({...rest })
