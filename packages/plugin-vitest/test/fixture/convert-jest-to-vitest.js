jest.mock('hello', {
    ...jest.requireActual('hello'),
    abc: jest.fn()
});