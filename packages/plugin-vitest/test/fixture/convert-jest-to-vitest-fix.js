vi.mock('hello', async () => ({
    ...await vi.importActual('hello'),
    abc: vi.fn(),
}));
