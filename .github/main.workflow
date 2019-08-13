workflow "Push" {
  resolves = ["lint", "coverage"]
  on = "push"
}

action "lint" {
  uses = "gimenete/eslint-action@1.0"
}

action "coverage" {
  uses = "coverallsapp/github-action@v1.0.1"
}
