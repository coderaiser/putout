test('LearnRow: a leaf does not toggle on a fine click', (t) => {
    const toggled: string[] = [];
    const push = toggled.push.bind(toggled);
    const picked: string[] = [];
    
    render(
    <LearnRow
            onSelect={push}
            onToggle={push}
        />
    );
});
