import {Program, Node} from '@putout/babel';
import {PrinterOptions, ParseOptions} from '@putout/engine-parser';
import {PutoutPlugin} from '../types/plugins.ts';
export type * from '../types/plugins.ts';
export * as operator from '../types/operator.ts';

export type {
    PrinterOptions,
    ParseOptions,
};
export {traverse, types} from '@putout/babel';

export function parse(source: string, options?: ParseOptions): Program;

export function template(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;
export declare namespace template {
    export function ast(source: string, options?: Record<string, unknown>): Node;
    export function program(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;
    export function extractExpression(node: Node): Node;
}
export function generate(node: Node, options?: Record<string, unknown>, sourceMaps?: Record<string, unknown>): string;

type PutoutReturn = {
    code: string;
    places: Place[];
};
type PrinterConfig =
    | 'putout'
    | 'babel'
    | ['putout', PrinterOptions?]
    | ['babel', Record<string, unknown>?];
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
    printer?: PrinterConfig;
};

type Options = ParseOptions & TransformOptions;

export default function putout(source: string, options: Options): PutoutReturn;

export function putoutAsync(source: string, options: Options): Promise<PutoutReturn>;

export function print(ast: Node, options?: PrinterOptions): string;

export interface Place {
    rule: string;
    message: string;
    position: {
        line: number;
        column: number;
    };
}

export function transform(ast: Node, options?: TransformOptions): Place[];
export function transformAsync(ast: Node, options?: TransformOptions): Promise<Place[]>;
export function findPlaces(ast: Node, options?: TransformOptions): Place[];
export function findPlacesAsync(ast: Node, options?: TransformOptions): Promise<Place[]>;

export function codeframe(args: {
    source: string;
    error: {
        message: string;
        loc?: unknown;
    };
    highlightCode?: boolean;
}): string;

