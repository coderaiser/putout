const init = stub().returns('hello');
const show = stub().returns('world');

t.calledInOrder([init, show]);
