const buildEnv = {
    ...(is17 && {
        NODE_OPTIONS: '--openssl-legacy-provider'
    })
}
