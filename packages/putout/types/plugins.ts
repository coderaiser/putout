import {NodePath} from '@putout/babel';

export type Traverse = (helpers: {
    push: (path: NodePath) => void;
    store: (key?: string, value?: unknown) => unknown;
    listStore: (path?: NodePath) => NodePath[];
    pathStore: (path?: NodePath) => NodePath[];
}) => Record<string, (path: NodePath) => void>;

export interface PutoutPlugin {
    report: Report;
    replace?: Replace;
    fix?: Fix;
    include?: Include;
    exclude?: Exclude;
    filter?: Filter;
    traverse?: Traverse;
}

export type Report = () => string;

export type Include = () => string[];

export type Exclude = () => string[] | (() => boolean);

export interface PluginOptions {
    options?: Record<string, unknown>;
}

export type Filter = (path: NodePath, options: PluginOptions) => boolean;

export type Fix = (path: NodePath, options: PluginOptions) => void;

type ReplaceResolver = (vars: Record<string, Node>, path: NodePath) => string | NodePath | '';

export type Replace = () => Record<string, string | ReplaceResolver>;
