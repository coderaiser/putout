# @putout/plugin-sql [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-sql.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-sql "npm"

> The React Framework for the Web
>
> (c) [sql.org](https://sql.org/)

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

- ✅ [apply-count](#apply-count)
- ✅ [convert-sqlite-to-postgresql](#convert-sqlite-to-postgresql);

## Config

```json
{
    "rules": {
        "sql/apply-count": "on",
        "sql/convert-sqlite-to-postgresql": "off"
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

## convert-sqlite-to-postgresql

### Rules

- ✅ [convert-last-insert-rowid-to-returnning-id](#convert-last-insert-rowid-to-returnning-id)
- ✅ [convert-auto-increment-to-identitiy](#convert-auto-increment-to-identitiy)

### Config

```json
{
    "rules": {
        "sql/convert-sqlite-to-postgresql/convert-last-insert-rowid-to-returnning-id": "off",
        "sql/convert-sqlite-to-postgresql/convert-auto-increment-to-identitiy": "off"
    }
}
```

### convert-last-insert-rowid-to-returnning-id

> The `last_insert_rowid()` function returns the ROWID of the last row insert from the database connection which invoked the function
>
> [sqlite.org](https://sqlite.org/lang_corefunc.html#last_insert_rowid)

> Sometimes it is useful to obtain data from modified rows while they are being manipulated. The `INSERT`, `UPDATE`, `DELETE`, and `MERGE` commands all have an optional `RETURNING` clause that supports this. Use of `RETURNING` avoids performing an extra database query to collect the data, and is especially valuable when it would otherwise be difficult to identify the modified rows reliably.
>
> [postgresql.org](https://www.postgresql.org/docs/current/dml-returning.html)

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

### convert-auto-increment-to-identitiy

If the `AUTOINCREMENT` keyword appears after `INTEGER PRIMARY KEY`, that changes the automatic `ROWID` assignment algorithm to prevent the reuse of `ROWIDs` over the lifetime of the database. In other words, the purpose of `AUTOINCREMENT` is to prevent the reuse of `ROWID`s from previously deleted rows.

> [sqlite.org](https://sqlite.org/autoinc.html)

An identity column is a special column that is generated automatically from an implicit sequence. It can be used to generate key values.

> [postgresql.org](https://www.postgresql.org/docs/current/ddl-identity-columns.html)

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

## License

MIT
