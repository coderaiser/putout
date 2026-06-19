export function toJS(source: string, name?: string): string;
export function fromJS(source: string, name?: string): string;
export function isJSON(source: string): boolean;
export function isTOML(source: string): boolean;
export function isDocker(source: string): boolean;
export function isJSONGroup(source: string): boolean;

export const __json_name: '__putout_processor_json';
export const __docker_name: '__putout_processor_docker';
export const __yaml_name: '__putout_processor_yaml';
export const __toml_name: '__putout_processor_toml';
export const __filesystem_name: '__putout_processor_filesystem';
export const __ignore_name: '__putout_processor_ignore';
export const __markdown_name: '__putout_processor_markdown';

export const __json: string;
export const __yaml: string;
export const __toml: string;
export const __docker: string;
export const __filesystem: string;
export const __ignore: string;
export const __markdown: string;
