export default {
    'prepublishOnly': () => run(['lint', 'test']),
}

const a = {
    'prepublishOnly': () => run(['lint', 'test']),
    'wisdom': run('test'),
}

const b = {
    'x': () => run(['lint', 'test']),
    'wisdom': run('test'),
}