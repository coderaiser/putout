__putout_processor_filesystem([
    '/',
    ['/actions.yaml', `
        name: Node CI
        on:
          push:
            branches: master
    `]
]);
