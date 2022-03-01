export default {
    'prepublishOnly': () => run(['lint', 'test']),
    'test': () => 'npm test',
}

