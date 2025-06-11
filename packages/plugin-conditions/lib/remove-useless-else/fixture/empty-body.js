if (isReturnStatement(last)) {} else {
    __body.body.push(expressionStatement(maybeRet(ret)));
}

