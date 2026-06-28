import type {Traverser} from '@putout/types/plugin';

type SortIgnoreOptions = {
    name: string;
    type?: string;
    property?: string;
};

export function sortIgnore(options: SortIgnoreOptions): Traverser;

