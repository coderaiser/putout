createTrigger(del_foo, afterDelete(foo), forEachRow(), execute(del_foo_fn));
