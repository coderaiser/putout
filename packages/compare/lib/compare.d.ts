import {Node, NodePath} from '@putout/babel';

export function compare(path: string | Node | {
    node: Node;
}, template: string | Node | {
    node: Node;
}, options?: {
        findUp?: boolean;
    }, equal?: (a: Node, b: Node) => void): boolean;

export function compareAny(path: string | Node | {
    node: Node;
}, templateNodes: string | Node | (string | Node)[], options?: {
        findUp?: boolean;
    }): boolean;

export function compareAll(path: string | Node | {
    node: Node;
}, templateNodes: string | Node | (string | Node)[], options?: {
        findUp?: boolean;
    }): boolean;

export function getTemplateValues(node: Node | {
    node: Node;
}, str: string): Record<string, Node>;

export function setValues(options: {
    waysTo: Record<string, string[]>;
    values: Record<string, Node>;
    path: NodePath;
}): void;

export function getValues(options: {
    waysFrom: Record<string, string[]>;
    node: Node;
}): Record<string, Node>;

export function findVarsWays(node: Node): Record<string, string[]>;

export function parseTemplate(tmpl: string, options?: {
    program?: boolean;
}): [Node, string];

export function isTemplate(a: string): boolean;

