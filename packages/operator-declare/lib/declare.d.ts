import type {Includer} from '@putout/types/plugin';

type DeclarePattern = string | {
    esm: string;
    commonjs: string;
};
type DeclareOptions = {
    [name: string]: DeclarePattern;
};

export function declare(options: DeclareOptions): Includer;

