test('events: abc', (t) => {
    view.destroy();
    off(view, eventName, handler);
    t.ok(fired, 'handler should fire when blur dispatched on contentDOM');
    
    t.end();
});
