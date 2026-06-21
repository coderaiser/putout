import {NodePath} from '@putout/babel';
import type {Traverser} from 'putout';

type IgnoreOptions = {
    name: string;
    list: string[];
    type?: string;
    property?: string;
};

export function ignore(options: IgnoreOptions): Traverser;
export function fix(options: {
    path: NodePath;
    name: string;
    matchedElements: NodePath[];
}): void;

