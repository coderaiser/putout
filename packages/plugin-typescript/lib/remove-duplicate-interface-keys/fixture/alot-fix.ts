interface LabelledContainer {
    label: string;
    content: T;
    option?: boolean;
    x: number;
    [index: number]: string;
    [propName: string]: any;
    [index: number]: string;
    (source: string): boolean;
    (start: number): string;
    reset(): void;
    reset(): any;
    a(c: (this: void, e: E) => void): void;
}
