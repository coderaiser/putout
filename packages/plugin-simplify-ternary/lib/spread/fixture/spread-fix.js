const a = {
    ...(DEV && {
        devtool: 'eval',
    })
}

const b = {
    ...(DEV && {
        devtool: 'eval',
    })
}

const c = {
    ...(DEV ? {
        devtool: 'eval',
    } : '')
}
