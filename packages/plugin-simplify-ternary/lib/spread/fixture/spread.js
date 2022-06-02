const a = {
    ...DEV ? {
        devtool: 'eval',
    } : {}
}

const b = {
    ...DEV ? {
        devtool: 'eval',
    } : null
}

const c = {
    ...DEV ? {
        devtool: 'eval',
    } : ''
}
