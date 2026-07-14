export const report = () => `Move out result from asssertion`;

export const replace = () => ({
    't.__(__a.__b(__args).__c)': `{
    	const {__c} = __a.__b(__args);
        t.__(__c);
    }`,
    't.__(__a(__b), __c)': `{
    	const result = __a(__b);
    	const expected = __c;
        t.__(result, expected);
    }`,
    't.__(__a(__b))': `{
    	const result = __a(__b);
        t.__(result);
    }`,
});
