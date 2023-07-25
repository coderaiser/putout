if (isTuple(config.rules[rule]))
    config.rules[rule] = ['off', config.rules[rule][1]];
else
    config.rules[rule] = 'off';

return config;
