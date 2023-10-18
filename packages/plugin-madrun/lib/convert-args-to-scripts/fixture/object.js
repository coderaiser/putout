  export default {
      'test': async () => await run('test:base', '', {
               PUTOUT_PROGRESS_BAR: 0,
               TEST: 1,
           }),
  }
