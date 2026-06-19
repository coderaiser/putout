import {NodePath} from '@putout/babel';

export function hasTagName(path: NodePath, name: string): boolean;
export function getAttributePath(path: NodePath, name: string): NodePath | null;
export function getAttributeNode(path: NodePath | {
    node: NodePath;
}, name: string): object | null;
export function getAttributeValue(path: NodePath, attributeName: string): string;
export function addAttributeValue(path: NodePath, name: string, value: string): void;
export function addAttribute(path: NodePath, name: string, value: string): void;
export function removeAttributeValue(path: NodePath | null | undefined, name: string, attributeValue: string): void;
export function setAttributeValue(path: NodePath, name: string, value: string): void;
export const addClassName: (path: NodePath, name: string) => void;
export function getClassName(path: NodePath): string;
export const removeClassName: (path: NodePath, name: string) => void;
export const containsClassName: (path: NodePath, className: string) => boolean;
export const hasDataName: (path: NodePath, value?: string) => boolean;
export const hasAttributeValue: (path: NodePath, name: string, value?: string) => boolean;
