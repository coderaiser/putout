  module.exports = {
      'coverage:long': () => run('coverage:base', run('test:base'), env),
  };
