__putout_processor_json({
   "jobs": {
      "build": {
         "runs-on": "ubuntu-latest",
         "strategy": {
            "matrix": {
               "node-version": ['14.x', '16.x']
            }
         }
      }
   }
});
