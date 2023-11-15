__putout_processor_yaml({
   "name": "Node CI",
   "on": [
      "push",
      "pull_request"
   ],
   "jobs": {
      "build": {
         "runs-on": "ubuntu-latest",
         "steps": [
            {
               "uses": "actions/checkout@v1"
            },
            {
             "uses": "oven-sh/setup-bun@v1",
             "with": {
                 "bun-version": "0.8"
             },
            },
            {
               "name": "Install Redrun",
               "run": "npm i redrun -g"
            },
         ]
      }
   }
});
