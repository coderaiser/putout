import {Scanner, PutoutPlugin} from '@putout/types/plugin';

type Files = Record<string, PutoutPlugin>;
type MatchFilesOptions = Files | {
    files: Files;
    exclude?: string[];
    filename?: string;
};

export function matchFiles(options: MatchFilesOptions): Scanner;

