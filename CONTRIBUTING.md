# Contributing

Any contribution, big or small, is welcome! If it's a feature, we'd recommend [creating an issue](https://github.com/robinjoseph08/pokedextracker.com/issues/new) for it first so that the implementation can be decided on before the PR goes up and to make sure no one is working on the same feature. It makes the review process a bit smoother so you don't have to keep going back to add things. If it's just a bug fix though, feel free to just put up the PR directly!

Some guidelines you should follow when submitting a PR:

* We use [`generate-changelog`](https://github.com/lob/generate-changelog) for automatic changelog generation whenever we deploy, so please follow the commit message format: `feat(info): add animations when toggling`.
* Ideally, your PR has one commit in it. If you you need to add another one because of a typo or refactor, you should squash your commits together. This makes the changelog and commit history much more managable to go through. If you need help squashing them, we can always help you out!
* Before submitting the PR, you should make sure that your code passes the linter. Running `npm run lint` locally will speed things up because the TravisCI build will fail if the linting doesn't pass.

