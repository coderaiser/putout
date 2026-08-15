import * as convertSqliteToPostgresql from './convert-sqlite-to-postgresql/index.js';
import * as applyCount from './apply-count/index.js';

export const rules = {
    'apply-count': applyCount,
    'convert-sqlite-to-postgresql/convert-last-insert-rowid-to-returnning-id': ['off', convertSqliteToPostgresql.rules['convert-last-insert-rowid-to-returning-id']],
};
