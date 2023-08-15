__putout_processor_json({
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
               "name": "Install Redrun",
               "run": "npm i redrun -g"
            },
            {
             "uses": "oven-sh/setup-bun@v1",
             "with": {
                 "bun-version": "latest"
             },
            },
         ]
      }
   }
});
