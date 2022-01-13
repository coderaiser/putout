interface LabelledContainer<T> {
    label: string;
    content: T;
    option?: boolean;
    readonly x: number;
    [index: number]: string;
    [propName: string]: any;
    readonly [index: number]: string;
    (source: string, subString: string): boolean;
    (start: number): string;
    reset(): void;
    reset(): any;
    a(c: (this: void, e: E) => void): void;
}
