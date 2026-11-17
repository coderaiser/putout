__putout_processor_sql([
    createFunction(del_foo_fn, returns(trigger), language(plpgsql), orReplace(), [
        deleteFrom(from(x), where(y === OLD.id)),
        returnOld(),
    ]),
    createTrigger(del_foo, afterDelete(foo), orReplace(), forEachRow(), execute(del_foo_fn)),
]);
