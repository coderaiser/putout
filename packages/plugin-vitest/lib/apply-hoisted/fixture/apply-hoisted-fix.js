import a from 'b';

const hoisted = vi.hoisted({
    hello: vi.fn(),
    world: vi.fn(),
});
beforeEach(() => {
    hello.mockClear();
    world.mockClear();
});
it('hello', () => {
    hoisted.hello.calledWith();
});
