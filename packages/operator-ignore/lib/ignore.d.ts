import type {Traverser} from '@putout/types/plugin';

type IgnoreOptions = {
    name: string;
    list: string[];
    type?: string;
    property?: string;
};

export function ignore(options: IgnoreOptions): Traverser;

