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

Here is list of rules:

```json
{
    "rules": {
        "sql/apply-count": "on"
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

## License

MIT
