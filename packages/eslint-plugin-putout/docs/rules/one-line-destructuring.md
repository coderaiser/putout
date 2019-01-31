# keep curly bracesin in one line when property is single (one-line-destructuring)

Please describe the origin of the rule here.

## Rule Details

This rule aims to shorten destricturing of one property.

Examples of **incorrect** code for this rule:

```js

const {
    username
} = user;

```

Examples of **correct** code for this rule:

```js

const {username} = user;

```

