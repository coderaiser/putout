__putout_processor_json({
   "jobs": {
      "build": {
         "runs-on": "ubuntu-latest",
         "strategy": {
            "matrix": {
               "node-version": ['16.x', '18.x']
            }
         }
      }
   }
});
