import {NodePath} from '@putout/babel';

export function addParens(path: NodePath): NodePath;
export function removeParens(path: NodePath): NodePath;
export function hasParens(path: NodePath, printer?: string): boolean;

