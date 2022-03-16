const init = stub().withName('init');
const show = stub().returns([]);

t.calledInOrder([init, show]);
