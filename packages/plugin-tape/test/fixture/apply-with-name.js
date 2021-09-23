const init = stub().withName('init');
const show = stub();

t.calledInOrder([init, show]);
