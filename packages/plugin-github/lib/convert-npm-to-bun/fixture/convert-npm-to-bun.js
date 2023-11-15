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
               "name": "Install Redrun",
               "run": "npm i redrun -g"
            },
            {
               "name": "Install Redrun",
               "run": "npm install"
            },
         ]
      }
   }
});
