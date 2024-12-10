const now = new Date();
now.setDate(1);
now.getMonth() < 11 ? (now.setMonth(now.getMonth() + 1)) : (now.setMonth(0), now.setFullYear(now.getFullYear() + 1));
