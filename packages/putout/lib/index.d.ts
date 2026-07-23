import {Node} from '@putout/babel';
import {PrinterOptions, ParseOptions} from '@putout/engine-parser';
import {PutoutPlugin} from '@putout/types/plugin';

export type * from '@putout/types/plugin';
export * as operator from '../types/operator.ts';

export * from '@putout/engine-parser';
export type {
    PrinterOptions,
    ParseOptions,
};

export {traverse, types} from '@putout/babel';

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

export interface Putout {
    (source: string, options: Options): PutoutReturn;
    parse(source: string, options?: ParseOptions): Node;
    print(ast: Node, options?: PrinterOptions): string;
}

export const putout: Putout;

export default putout;

export function putoutAsync(source: string, options: Options): Promise<PutoutReturn>;

export function parse(source: string, options?: ParseOptions): Node;

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

