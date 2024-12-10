var a = new Date();
a.setDate(1);
a.getMonth() < 11 ? (a.setMonth(a.getMonth() + 1)) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
