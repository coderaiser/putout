const init = stub().withName('init');
const show = stub().returns([]).withName('show');

t.calledInOrder([init, show]);
