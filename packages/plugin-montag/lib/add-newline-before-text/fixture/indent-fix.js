test('putout: operator: json: isDocker', ({ok}) => {
    const source = montag`
        __putout_processor_docker([
            ['MAINTAINER', 'docker@moby.com']
        ]);\n
    `;
    
    const is = isDocker(source);
    
    ok(is);
});
