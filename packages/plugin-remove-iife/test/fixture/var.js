const loop = () => {}

export const devLogger = (() => {
  if (process.env.NODE_ENV === 'development') {
    return console
  }
  // return { log: loop, warn: loop, error: loop }
})()
