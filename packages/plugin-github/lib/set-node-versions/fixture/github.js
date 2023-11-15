__putout_processor_yaml({
   "jobs": {
      "build": {
         "runs-on": "ubuntu-latest",
         "strategy": {
            "matrix": {
               "node-version": [
                  "14.x",
                  "15.x"
               ]
            }
         }
      }
   }
});
