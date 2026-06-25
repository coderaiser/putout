import {NodePath} from '@putout/babel';

export function getParentDirectory(filePath: NodePath): NodePath | null;

export const crawlDirectory: (a: NodePath) => NodePath[];

type FindFileOptions = string[] | {
    exclude?: string[];
    crawled?: NodePath[];
};

export function findFile(node: NodePath, name: string | string[] | Set<string>, options?: FindFileOptions): NodePath[];

export function getFilename(filePath: NodePath): string;

export function getFileType(filePath: NodePath): string;

export function getFileContent(filePath: NodePath): [boolean, string | undefined];

export const renameFile: (filePath: NodePath, name: string) => void;

export function removeFile(filePath: NodePath): void;

export const removeEmptyDirectory: (dirPath: NodePath) => void;

export const moveFile: (filePath: NodePath, dirPath: NodePath) => void;

export const copyFile: (filePath: NodePath, dirPath: NodePath) => void;

export const createFile: (dirPath: NodePath, name: string, content?: string) => NodePath;

export function readDirectory(dirPath: NodePath): NodePath[];

export function createDirectory(dirPath: NodePath, name: string): NodePath;

export const readFileContent: (filePath: NodePath) => string;

export function writeFileContent(filePath: NodePath, content: string): void;

export const createNestedDirectory: (path: NodePath, name: string) => NodePath;

export function getRootDirectory(path: NodePath): NodePath;

type GetFileOptions = {
    type?: string;
};

export function getFile(directoryPath: NodePath, name: string | string[], options?: GetFileOptions): IterableIterator<NodePath>;

