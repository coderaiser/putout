# @putout/plugin-sql [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-sql.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-sql "npm"

> **SQL** (Structured Query Language) is a descriptive computer language designed for updating, retrieving, and calculating data in table-based databases.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/SQL)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability improve SQL. *Not Bundled*.

## Install

```
npm i putout @putout/plugin-sql -D
```

Add `.putout.json` with:

```json
{
    "plugins": ["sql"]
}
```

## Rules

- ✅ [apply-count](#apply-count);
- ✅ [postgres](#postgres);
- ✅ [convert-sqlite-to-postgres](#convert-sqlite-to-postgres);
- ✅ [convert-postgres-to-sqlite](#convert-postgres-to-sqlite);

## Config

```json
{
    "rules": {
        "sql/apply-count": "on",
        "sql/postgres": "on",
        "sql/convert-sqlite-to-postgres": "off",
        "sql/convert-postgres-to-sqlite": "off"
    }
}
```

## apply-count

> The COUNT() function returns the number of rows that matches a specified criterion.
>
> (c) [w3cshools.com](https://www.w3schools.com/sql/sql_count.asp)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/261a315b2f1660be26f27229b9ac62b4/87b0ba6f123ef0fb7aa3e89b5fee33beedea83fe).

### ❌ Example of incorrect code

```sql
SELECT COUNT(1) FROM orders
```

### ✅ Example of correct code

```sql
SELECT COUNT(*) FROM orders
```

## convert-sqlite-to-postgres

### Rules

- ✅ [convert-last-insert-rowid-to-returning-id](#convert-last-insert-rowid-to-returning-id);
- ✅ [convert-auto-increment-to-identity](#convert-auto-increment-to-identity);
- ✅ [convert-generate-series-to-with-recursive](#convert-generate-series-to-with-recursive);

### Config

```json
{
    "rules": {
        "sql/convert-sqlite-to-postgres/apply-generate-series": "off",
        "sql/convert-sqlite-to-postgres/convert-last-insert-rowid-to-returnning-id": "off",
        "sql/convert-sqlite-to-postgres/convert-auto-increment-to-identitiy": "off",
        "sql/convert-sqlite-to-postgres/convert-generate-series-to-with-recursive": "off"
    }
}
```

### convert-last-insert-rowid-to-returning-id

> The `last_insert_rowid()` function returns the ROWID of the last row insert from the database connection which invoked the function
>
> [sqlite.org](https://sqlite.org/lang_corefunc.html#last_insert_rowid)

> Sometimes it is useful to obtain data from modified rows while they are being manipulated. The `INSERT`, `UPDATE`, `DELETE`, and `MERGE` commands all have an optional `RETURNING` clause that supports this. Use of `RETURNING` avoids performing an extra database query to collect the data, and is especially valuable when it would otherwise be difficult to identify the modified rows reliably.
>
> [postgres.org](https://www.postgres.org/docs/current/dml-returning.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0ad7f0bb883246a522452ba53c5e2844/d575938baa3d6ad31021658b80121545ea75e0f8).

#### ❌ Example of incorrect code

```sql
INSERT INTO users (name)
VALUES ('Alice');
SELECT last_insert_rowid();
```

#### ✅ Example of correct code

```sql
INSERT INTO users (name)
VALUES ('Alice')
RETURNING id;
```

### convert-auto-increment-to-identity

If the `AUTOINCREMENT` keyword appears after `INTEGER PRIMARY KEY`, that changes the automatic `ROWID` assignment algorithm to prevent the reuse of `ROWIDs` over the lifetime of the database. In other words, the purpose of `AUTOINCREMENT` is to prevent the reuse of `ROWID`s from previously deleted rows.

> [sqlite.org](https://sqlite.org/autoinc.html)

An identity column is a special column that is generated automatically from an implicit sequence. It can be used to generate key values.

> [postgres.org](https://www.postgres.org/docs/current/ddl-identity-columns.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/06cd2641c1d1c7150e73bc672874e247/c0a15d84bd270dada57ff0c7960c2a819fd166dc).

#### ❌ Example of incorrect code

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);
```

#### ✅ Example of correct code

```sql
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);
```

### convert-generate-series-to-with-recursive

> The `generate_series()` generates a series of values from start to stop, with a step size of step
>
> [postgresql.org](https://www.postgresql.org/docs/current/functions-srf.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/100b3baa207b102b096d5d41c047bb2a/3f48386ab2ed4ad0e607f07d4ad3ca172177e10c).

#### ❌ Example of incorrect code

```sql
SELECT * FROM generate_series(1, 10, 2);
```

#### ✅ Example of correct code

```sql
WITH RECURSIVE numbers(value) AS (
    SELECT 1
    UNION ALL
    SELECT value + 2
    FROM numbers
    WHERE value < 10
)
SELECT value FROM numbers;
```

## convert-postgres-to-sqlite

### Rules

- ✅ [apply-json-extract](#apply-json-extract);
- ✅ [apply-auto-increment](#apply-auto-increment);
- ✅ [convert-with-to-sequential](#convert-with-to-sequential);
- ✅ [convert-lastval-to-last-insert-rowid](#convert-lastval-to-last-insert-rowid);

### Config

```json
{
    "rules": {
        "sql/convert-postgrest-to-sqlite/apply-json-extract": "off",
        "sql/convert-postgrest-to-sqlite/apply-auto-increment": "off",
        "sql/convert-postgrest-to-sqlite/convert-with-to-sequential": "off",
        "sql/convert-postgrest-to-sqlite/convert-lastval-to-last-insert-rowid": "off"
    }
}
```
### apply-json-extract

> The `json_extract(X,P1,P2,...)` extracts and returns one or more values from the well-formed JSON at `X`.
>
> [sqlite.org](https://sqlite.org/json1.html#the_json_extract_function)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3edec887a1650739b770ab13c470eb80/ee6ca81970429fa26ec85d7ee4058ad88d1b444d).

#### ❌ Example of incorrect code

```sql
SELECT jsonb_extract_path_text(data, 'user', 'name')
FROM users;
```

#### ✅ Example of correct code

```sql
SELECT json_extract(data, '$.user.name')
FROM users;
```

### apply-auto-increment

> With `AUTOINCREMENT`, rows with automatically selected ROWIDs are guaranteed to have ROWIDs that have never been used before by the same table in the same database. And the automatically generated ROWIDs are guaranteed to be monotonically increasing.
>
> [sqlite.org](https://sqlite.org/autoinc.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/1a05bedfd9f26629ef8ece27525beb5a/bed59477cecf0b973c54c89a924971a49fe64ed9).

#### ❌ Example of incorrect code

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT
);
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT
);
```

#### ✅ Example of correct code

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);
```

### convert-with-to-sequential

> `WITH` provides a way to write auxiliary statements for use in a larger query. These statements, which are often referred to as Common Table Expressions or **CTE**s, can be thought of as defining temporary tables that exist just for one query. Each auxiliary statement in a `WITH` clause can be a `SELECT`, `INSERT`, `UPDATE`, `DELETE`, or `MERGE`.
>
> [postgres.org](https://www.postgresql.org/docs/current/queries-with.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8940286d36d5e0daa44d1660f0c9e2aa/3e10e3a24dbff576f7fc23f1bddffac576db6573).

#### ❌ Example of incorrect code

```sql
INSERT INTO users (name)
VALUES ('Alice');
SELECT last_insert_rowid();
```

#### ✅ Example of correct code

```sql
INSERT INTO users (name)
VALUES ('Alice')
RETURNING id;
```

### convert-lastval-to-last-insert-rowid

> `nextval` returns the value most recently returned by nextval in the current session. This function is identical to `currval`, except that instead of taking the sequence name as an argument it refers to whichever sequence nextval was most recently applied to in the current session. It is an error to call `lastval` if `nextval` has not yet been called in the current session.
>
> [postgres.org](https://www.postgresql.org/docs/current/functions-sequence.html)

> The `last_insert_rowid()` function returns the `ROWID` of the last row insert from the database connection which invoked the function.
>
> (c) [sqlite.org](https://sqlite.org/lang_corefunc.html#last_insert_rowid)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6098b060fe10c8105a7d5756c2827e14/3b1e6c7e7a34fda07d5eecefb687f48bbdbee0d4).

#### ❌ Example of incorrect code

```sql
SELECT lastval();
```

#### ✅ Example of correct code

```sql
SELECT last_insert_rowid();
```

## postgres

### Rules

- ✅ [apply-generate-series](#apply-generate-series);
- ✅ [convert-sequence-to-serial](#convert-sequence-to-serial);
- ✅ [convert-serial-to-identity](#convert-serial-to-identity);

### Config

```json
{
    "rules": {
        "sql/postgres/apply-generate-series": "on",
        "sql/postgres/convert-sequence-to-serial": "on",
        "sql/postgres/convert-serial-to-identity": "on"
    }
}
```

### apply-generate-series

> The `generate_series()` generates a series of values from start to stop, with a step size of step
>
> [postgresql.org](https://www.postgresql.org/docs/current/functions-srf.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f3344608f9b4749e094dadce67f0ca4b/f8a701e1dfbdba1826311061bc3bf9a79a3415fe).

#### ❌ Example of incorrect code

```sql
WITH RECURSIVE numbers(value) AS (
    SELECT 1
    UNION ALL
    SELECT value + 2
    FROM numbers
    WHERE value < 10
)
SELECT value FROM numbers;
```

#### ✅ Example of correct code

```sql
SELECT * FROM generate_series(1, 10, 2);
```

### convert-sequence-to-serial

> The data types `smallserial`, `serial` and `bigserial` are not true types, but merely a notational convenience for creating unique identifier columns (similar to the `AUTO_INCREMENT` property supported by some other databases)
>
> [postgres.org](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f633d8ea9a0b74276a80e8586e94b65c/d829ca2338d7f3b5aef5d1f98a2648a4c2f92d28).

#### ❌ Example of incorrect code

```sql
CREATE SEQUENCE users_id_seq;
CREATE TABLE users (
    id INTEGER DEFAULT nextval('users_id_seq') PRIMARY KEY,
    name TEXT
);
```

#### ✅ Example of correct code

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

### convert-serial-to-identity

> An identity column is a special column that is generated automatically from an implicit sequence. It can be used to generate key values.
>
> [postgres.org](https://www.postgresql.org/docs/current/ddl-identity-columns.html)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/68fa280dcb4b9beadae0cb6af9803859/cf5f72ea7f41cde0a0e8c8311ab4cd2c601a8533).

#### ❌ Example of incorrect code

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

#### ✅ Example of correct code

```sql
CREATE TABLE users (
    id GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT
);
```

## License

MIT
