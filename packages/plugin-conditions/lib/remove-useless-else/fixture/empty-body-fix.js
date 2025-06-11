if (!isReturnStatement(last)) {
    __body.body.push(expressionStatement(maybeRet(ret)));
}
