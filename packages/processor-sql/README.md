# @putout/processor-sql [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/processor-sql.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/processor-sql "npm"

> **sql**, the simple and easy-to-use markup language you can use to format virtually any document.
>
> (c) [sqlguide.org](https://www.sqlguide.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) processor adds ability to get **JavaScript**, **JSX**, **JSON** and **TypeScript** code from **sql** files.

## Install

```
npm i @putout/processor-sql -D
```

## Config

```json
{
    "processors": ["sql"]
}
```

## Usage

Processor converts `sql` to JavaScript, it looks like this.

```sql
SELECT * FROM users;
```

Became:

```js
__putout_processor_sql(
    select(
        '*',
        from(
            users,
        ),
    ),
);
```

## License

MIT
