import type {Linter} from 'eslint';

export type FlatConfig = Linter.Config;

export type FlatConfigArray = FlatConfig[];

export interface MatchToFlatDirOverrides {
    readESLintConfig?: (dir: string) => Promise<FlatConfigArray>;
}

export function matchToFlatDir(cwd: string, path: string, config?: FlatConfigArray, overrides?: MatchToFlatDirOverrides): Promise<FlatConfigArray>;

export function matchToFlat<const T extends Record<string, Record<string, 'off' | 'on'>>>(config: T): FlatConfigArray;

export interface MergeESLintConfigsOptions {
    readdir?: (dir: string) => Promise<string[]>;
    readESLintConfig?: (dir: string) => Promise<FlatConfigArray>;
}

export function mergeESLintConfigs(cwd: string, directories: string | string[], options?: MergeESLintConfigsOptions): Promise<FlatConfigArray>;

export function createESLintConfig(...configs: FlatConfigArray): FlatConfigArray;

