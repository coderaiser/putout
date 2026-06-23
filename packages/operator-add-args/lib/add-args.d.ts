import type {Traverser} from '@putout/types/plugin';

type AddArgsPattern = string | string[] | {
    type?: string;
    include?: string | string[];
    exclude?: string | string[];
};
type AddArgsOptions = {
    [name: string]: [
        declaration: string,
        pattern: AddArgsPattern,
    ];
};

export function addArgs(options: AddArgsOptions): Traverser;

