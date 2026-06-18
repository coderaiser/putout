import {File, Program} from '@putout/babel';
import {PutoutPlugin} from '../types/plugins.ts';

export declare function parse(source: string): Program;
export {traverse} from '@putout/babel';

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

type RuleTuple =
    | [RuleState]
    | [RuleState, RuleOptions]
    | [RuleState, string, RuleOptions]; // [state, message, options] — кастомный текст сообщения

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

export interface PrintOptions {
    printer?: 'putout' | 'babel' | [string, Record<string, unknown>];
}

export function print(ast: File, options?: PrintOptions): string;

export interface Place {
    rule: string;
    message: string;
    position: {line: number; column: number};
}

export function transform(ast: File, options?: TransformOptions): Place[];
export function transformAsync(ast: File, options?: TransformOptions): Promise<Place[]>;
export function findPlaces(ast: File, options?: TransformOptions): Place[];
export function findPlacesAsync(ast: File, options?: TransformOptions): Promise<Place[]>;

export function codeframe(args: {source: string; error: {message: string; loc?: unknown}; highlightCode?: boolean}): string;
