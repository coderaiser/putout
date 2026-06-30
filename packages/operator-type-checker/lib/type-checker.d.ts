type TypeChecker = (path: unknown, options?: unknown) => boolean;

type TypeCheckerOptions = {
    create?: (checkers: string[], typeOptions: {
        instrumentName: string;
    }) => TypeChecker;
};

export function createTypeChecker(checkers: string[], overrides?: TypeCheckerOptions): TypeChecker;

