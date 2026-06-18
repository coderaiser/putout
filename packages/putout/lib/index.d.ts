import {
    File,
    Program,
    Node,
} from '@putout/babel';
import {PutoutPlugin} from '../types/plugins.ts';

export * as operator from '../types/operator.ts';

export declare function parse(source: string): Program;
export {traverse, types} from '@putout/babel';

export declare function template(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;
export declare namespace template {
    export function ast(source: string, options?: Record<string, unknown>): Node;
    export function program(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;
    export function extractExpression(node: Node): Node;
} export declare function generate(node: Node, options?: Record<string, unknown>, sourceMaps?: Record<string, unknown>): string;

type PutoutReturn = {
    code: string;
    places: Place[];
};

export interface ParseOptions {
    parser?: 'babel' | 'acorn' | 'espree' | 'esprima' | 'tenko';
    printer?: 'putout' | 'babel';
    isTS?: boolean;
    isJSX?: boolean;
}

type RuleState = 'on' | 'off' | boolean;
type RuleOptions = Record<string, unknown>;
type RuleTuple = [
    RuleState,
] | [
    RuleState,
    RuleOptions,
] | [RuleState, string, RuleOptions];
type RuleValue = RuleState | RuleTuple;

export type Rules = Record<string, RuleValue>;

export type TransformOptions = {
    plugins?: (string | [string, Record<string, unknown>] | [string, PutoutPlugin])[];
    rules?: Rules;
    fix?: boolean;
    fixCount?: number;
    parser?: string;
    printer?: string;
};

type Options = ParseOptions & TransformOptions;

export default function putout(source: string, options: Options): PutoutReturn;

export function putoutAsync(source: string, options: Options): Promise<PutoutReturn>;

export interface PrintOptions {
    printer?: 'putout' | 'babel' | [string, Record<string, unknown>];
}

export function print(ast: File, options?: PrintOptions): string;

export interface Place {
    rule: string;
    message: string;
    position: {
        line: number;
        column: number;
    };
}

export function transform(ast: File, options?: TransformOptions): Place[];
export function transformAsync(ast: File, options?: TransformOptions): Promise<Place[]>;
export function findPlaces(ast: File, options?: TransformOptions): Place[];
export function findPlacesAsync(ast: File, options?: TransformOptions): Promise<Place[]>;

export function codeframe(args: {
    source: string;
    error: {
        message: string;
        loc?: unknown;
    };
    highlightCode?: boolean;
}): string;

