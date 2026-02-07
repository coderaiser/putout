__putout_processor_yaml({
  "name": "Node CI",
  "on": [
    "push",
    "pull_request"
  ],
  "jobs": {
    "build": {
      "steps": [
        {
          "name": "Commit fixes",
          "uses": "EndBug/add-and-commit@v9",
          "continue-on-error": true,
          "with": {
              "message": "chore(${{ env.NAME }}) lint using actions"
          }
        },
      ]
    }
  }
});