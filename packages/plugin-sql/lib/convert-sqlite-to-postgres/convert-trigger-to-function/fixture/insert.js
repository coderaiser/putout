__putout_processor_sql([
    createTrigger(add_foo, beforeInsert(foo), [
        deleteFrom(from(x), where(y === NEW.id)),
    ]),
]);
