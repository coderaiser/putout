import {
    Node,
    NodePath,
    Binding,
} from '@putout/babel';

export function isSimple(a: Node): boolean;
export function extract(node: NodePath | Node): string;
export function compute(path: NodePath): [boolean, unknown?];
export function remove(path: NodePath): void;
export function getExportDefault(path: NodePath): NodePath | null;
export function getLiteralRaw(path: NodePath): string;
export function isModuleExports(path: NodePath): boolean;
export function insertBefore(path: NodePath, node: Node): void;
export function insertAfter(path: NodePath, node: Node): void;
export function isESM(path: NodePath): boolean;
export function setLiteralValue(path: NodePath, newValue: string | number): void;
export function getBinding(path: NodePath, node: Node | string): Binding | undefined;
export function getBindingPath(path: NodePath, name: string): NodePath | undefined;
export function rename(path: NodePath, from: string, to: string): void;
export function renameProperty(path: NodePath, from: string, to: string): void;
export function getPathAfterRequires(body: NodePath[]): NodePath;
export function findBinding(path: NodePath, name: string): Binding | null;
export function getPathAfterImports(body: NodePath[]): NodePath;
export function traverseProperties(path: NodePath, name: string, options?: {
    firstLevel?: boolean;
}): NodePath[];
export function getProperties(path: NodePath, names: string[]): Record<string, NodePath>;
export function getProperty(path: NodePath, name: string): NodePath | null;
export function toExpression(el: Node): Node;
export function replaceWithMultiple(path: NodePath, nodes: Node[]): void;
export function replaceWith(path: NodePath, node: Node): void;

