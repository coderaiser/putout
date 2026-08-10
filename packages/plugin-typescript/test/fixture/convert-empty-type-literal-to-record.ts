type TestFunction<T extends Test = Test> = ((message: string, fn: (t: T) => void, options?: TestOptions) => void) & {
    skip: TestFunction<T>;
    only: TestFunction<T>;
    extend<U extends CustomOperator = {}>(operators?: U): TestFunction<T & OperatorsToMethods<U>>;
};


type TestFunction2<T extends Test = Test> = ((message: string, fn: (t: T) => void, options?: TestOptions) => void) & {
    skip: TestFunction<T>;
    only: TestFunction<T>;
    extend<U extends {}>(operators?: U): TestFunction<T & OperatorsToMethods<U>>;
};

type EmptyObject = Record<PropertyKey, never>;
type TestFunction3 <T extends Test = Test> = ((message: string, fn: (t: T) => void, options?: TestOptions) => void) & {
    skip: TestFunction<T>;
    only: TestFunction<T>;
    extend<U extends CustomOperator = Record<PropertyKey, never>>(operators?: U): TestFunction<T & OperatorsToMethods<U>>;
};