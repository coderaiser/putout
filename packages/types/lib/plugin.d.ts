import {NodePath} from '@putout/babel';

type TrackFile = (...args: unknown[]) => Generator<unknown, void, unknown>;
type CrawlFile = (...args: unknown[]) => Generator<unknown, void, unknown>;

export type Scan = (path: NodePath, ScanApi: {
    push: (path: NodePath) => void;
    options?: PluginOptions;
    trackFile?: TrackFile;
    crawlFile?: CrawlFile;
}) => void;

export type Traverse = (api: {
    push: (path: NodePath) => void;
    store: (key?: string, value?: unknown) => unknown;
    listStore: (path?: NodePath) => NodePath[];
    pathStore: (path?: NodePath) => NodePath[];
}) => Record<string, (path: NodePath) => void>;

export type Scanner = (path: NodePath, ScanApi: {
    report: Report;
    scan: Scan;
    fix: Fix;
}) => void;

export type Traverser = {
    report: Report;
    traverse: Traverse;
    fix: Fix;
};

export type Replacer = {
    report: Report;
    replace: Replace;
    match?: Match;
};

export type Includer = {
    report: Report;
    fix: Fix;
    include: Include;
    exclude?: Exclude;
    filter?: Filter;
};

export type PutoutPlugin =
    | Replacer
    | Includer
    | Traverser
    | Declarator;

export type Report = () => string;

export type Include = () => string[];

export type Exclude = () => string[] | (() => boolean);

export type PluginOptions = {
    options?: Record<string, unknown>;
};

export type Filter = (path: NodePath, options: PluginOptions) => boolean;

export type Fix = (path: NodePath, options: PluginOptions) => void;

type ReplaceResolver = (vars: Record<string, Node>, path: NodePath) => string | NodePath | '';

export type Replace = () => Record<string, string | ReplaceResolver>;

type MatchResolver = (vars: Record<string, Node>, path: NodePath) => boolean;

export type Match = () => Record<string, MatchResolver>;

export type Declarator = {
    declare: () => Record<string, string | {
        esm: string;
        commonjs: string;
    }>;
};
