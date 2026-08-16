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

### Config

```json
{
    "rules": {
        "sql/convert-sqlite-to-postgres/convert-last-insert-rowid-to-returnning-id": "off",
        "sql/convert-sqlite-to-postgres/convert-auto-increment-to-identitiy": "off"
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

## convert-postgres-to-sqlite

### Rules

- ✅ [convert-with-to-sequential](#convert-with-to-sequential);

### Config

```json
{
    "rules": {
        "sql/convert-postgrest-to-sqlite/convert-with-to-sequential": "off"
    }
}
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

## postgres

### Rules

- ✅ [convert-sequence-to-serial](#convert-sequence-to-serial);
- ✅ [convert-serial-to-identity](#convert-serial-to-identity);

### Config

```json
{
    "rules": {
        "sql/postgres/convert-sequence-to-serial": "on",
        "sql/postgres/convert-serial-to-identity": "on"
    }
}
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
