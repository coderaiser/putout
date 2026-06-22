import {Node, Program} from '@putout/babel';
import {
    Format,
    Semantics,
    Visitors,
} from '@putout/printer';

export type PrinterFormat = Format;

export type PrinterSemantics = Semantics;

export type PrinterVisitors = Visitors;

export interface PrinterOptions {
    format?: PrinterFormat;
    semantics?: PrinterSemantics;
    visitors?: PrinterVisitors;
}

// --- Parse ---
export interface ParseOptions {
    parser?: 'babel' | 'acorn' | 'espree' | 'esprima' | 'tenko';
    printer?: 'putout' | 'babel';
    isTS?: boolean;
    isJSX?: boolean;
}

export function parse(source: string, options?: ParseOptions): Program;

// --- Print ---
type PrinterName = 'putout' | 'babel';
type PrinterTuple = [
    name: PrinterName,
    options: Record<string, unknown>,
];

export interface PrintOptions {
    printer?: PrinterName | PrinterTuple;
    source?: string;
}

export function print(ast: Node, options?: PrintOptions): string;

export function generate(node: Node, options?: Record<string, unknown>, sourceMaps?: Record<string, unknown>): string;

export function template(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;

export namespace template {
    export function ast(source: string, options?: Record<string, unknown>): Node;
    export function program(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;
    export function extractExpression(node: Node): Node;
    
    export namespace ast {
        export function fresh(source: string, options?: Record<string, unknown>): Node;
    }
    export namespace program {
        export function ast(source: string, options?: Record<string, unknown>): Node;
    }}
