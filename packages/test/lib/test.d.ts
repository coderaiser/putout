import {
    Test,
    OperationResult,
    OperatorFactory,
} from 'supertape';

type TestOptions = {
    checkAssertionsCount?: boolean;
    checkScopes?: boolean;
    checkDuplicates?: boolean;
    timeout?: number;
};
type CustomOperator = Record<string, OperatorFactory>;
type OperatorsToMethods<T> = {
    [K in keyof T]:
    T[K] extends OperatorFactory
        ? ReturnType<T[K]>
        : never;
};
type TestFunction<T extends Test = Test> = ((message: string, fn: (t: T) => void, options?: TestOptions) => void) & {
    skip: TestFunction<T>;
    only: TestFunction<T>;
    extend<U extends CustomOperator = {}>(operators?: U): TestFunction<T & OperatorsToMethods<U>>;
};
type Formatter = (...args: unknown[]) => unknown;
type FormatterOptions = Record<string, unknown>;
type Addons = Record<string, unknown>;
type PluginOptions = Record<string, unknown>;

export type TransformOperator = (name: string, transformed?: string | Addons, addons?: Addons) => OperationResult;

export type NoTransformOperator = (name: string, addons?: Addons) => OperationResult;

export type TransformCodeOperator = (input: string, output: string, isTS?: boolean) => OperationResult;

export type NoTransformCodeOperator = (input: string) => OperationResult;

export type TransformWithOptionsOperator = (name: string, pluginOptions: PluginOptions) => OperationResult;

export type NoTransformWithOptionsOperator = (name: string, pluginOptions: PluginOptions) => OperationResult;

export type ReportOperator = (name: string, message: string | string[], plugins?: unknown) => OperationResult;

export type NoReportOperator = (name: string, addons?: unknown[]) => OperationResult;

export type NoReportAfterTransformOperator = (name: string, addons?: Addons) => OperationResult;

export type NoReportAfterTransformWithOptionsOperator = (name: string, pluginOptions: PluginOptions) => OperationResult;

export type ReportWithOptionsOperator = (name: string, message: string, pluginOptions: PluginOptions) => OperationResult;

export type NoReportWithOptionsOperator = (name: string, pluginOptions: PluginOptions) => OperationResult;

export type ReportCodeOperator = (source: string, message: string | string[], addons?: unknown) => OperationResult;

export type NoReportCodeOperator = (source: string) => OperationResult;

export type FormatOperator = (formatter: Formatter, name: string, formatterOptions?: FormatterOptions) => Promise<OperationResult>;

export type FormatManyOperator = (formatter: Formatter, names: string[], formatterOptions?: FormatterOptions) => Promise<OperationResult>;

export type NoFormatOperator = (formatter: Formatter, name: string, formatterOptions?: FormatterOptions) => Promise<OperationResult>;

export type ProgressOperator = (name: string, expected: unknown) => Promise<OperationResult>;

export type ProgressWithOptionsOperator = (name: string, pluginOptions: PluginOptions, expected: unknown) => Promise<OperationResult>;

export interface PutoutTest extends Test {
    transform: TransformOperator;
    noTransform: NoTransformOperator;
    transformCode: TransformCodeOperator;
    noTransformCode: NoTransformCodeOperator;
    progress: ProgressOperator;
    progressWithOptions: ProgressWithOptionsOperator;
    transformWithOptions: TransformWithOptionsOperator;
    noTransformWithOptions: NoTransformWithOptionsOperator;
    report: ReportOperator;
    noReport: NoReportOperator;
    noReportAfterTransform: NoReportAfterTransformOperator;
    noReportAfterTransformWithOptions: NoReportAfterTransformWithOptionsOperator;
    reportWithOptions: ReportWithOptionsOperator;
    noReportWithOptions: NoReportWithOptionsOperator;
    reportCode: ReportCodeOperator;
    noReportCode: NoReportCodeOperator;
    format: FormatOperator;
    formatMany: FormatManyOperator;
    noFormat: NoFormatOperator;
}

export type PutoutTestFunction = TestFunction<PutoutTest>;

export function createTest(url: string, options: unknown, maybeExtends?: Record<string, unknown>): PutoutTestFunction;

export default createTest;
