'use strict';

module.exports.report = () => 'Avoid passing default messages to operators';

module.exports.replace = () => ({
    't.ok(__a, "should be truthy")': 't.ok(__a)',
    't.notOk(__a, "should be falsy")': 't.notOk(__a)',
    't.match(__a, __b, "should match")': 't.match(__a, __b)',
    't.notMatch(__a, __b, "should not match")': 't.notMatch(__a, __b)',
    't.equal(__a, __b, "should equal")': 't.equal(__a, __b)',
    't.notEqual(__a, __b, "should not equal")': 't.notEqual(__a, __b)',
    't.deepEqual(__a, __b, "should deep equal")': 't.deepEqual(__a, __b)',
    't.deepEqual(__a, __b, "should equal")': 't.deepEqual(__a, __b)',
    't.notDeepEqual(__a, __b, "should not deep equal")': 't.notDeepEqual(__a, __b)',
});
