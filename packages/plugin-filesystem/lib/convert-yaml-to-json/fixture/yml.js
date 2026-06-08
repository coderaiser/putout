__putout_processor_filesystem([
    '/',
    ['/actions.yml', `
        name: Node CI
        on:
          push:
            branches: master
    `]
]);
