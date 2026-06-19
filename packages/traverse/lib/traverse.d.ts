import {
    Node,
    NodePath,
} from '@putout/babel';

type Visitor = Record<string, (path: NodePath, variables?: Record<string, Node>) => void>;

export function traverse(path: Node | NodePath | {
    node: Node;
}, visitor: Visitor): void;

export const superTraverse: typeof traverse;

export function contains(path: Node | NodePath | {
    node: Node;
}, items: string[]): boolean;
