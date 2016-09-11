# Contributing

Any contribution, big or small, is welcome! If it's a feature, we'd recommend [creating an issue](https://github.com/robinjoseph08/pokedextracker.com/issues/new) for it first so that the implementation can be decided on before the PR goes up and to make sure no one is working on the same feature. It makes the review process a bit smoother so you don't have to keep going back to add things. If it's just a bug fix though, feel free to just put up the PR directly!

Some guidelines you should follow when submitting a PR:

* We use [`generate-changelog`](https://github.com/lob/generate-changelog) for automatic changelog generation whenever we deploy, so please follow the commit message format: `feat(info): add animations when toggling`.
* Ideally, your PR has one commit in it. If you you need to add another one because of a typo or refactor, you should squash your commits together. This makes the changelog and commit history much more managable to go through. If you need help squashing them, we can always help you out!
* Before submitting the PR, you should make sure that your code passes the linter. Running `npm run lint` locally will speed things up because the TravisCI build will fail if the linting doesn't pass.

## Shrinkwrap

Since this project is built using Node and NPM, we have a `package.json` to list all of the top-level dependencies that we use. Since the version numbers in there can leave a lot up for interpretation, we also have an [`npm-shrinkwrap.json` file](https://docs.npmjs.com/cli/shrinkwrap) to lock down exact versions of direct dependencies and the versions of nested dependencies. One issue with the shrinkwrap though is that [it can make any optional dependencies required](https://github.com/npm/npm/issues/2679). One such example of this is the [`fsevents`](https://www.npmjs.com/package/fsevents) module. This is an optional dependency that is only able to be built on Mac OS X. So if this module becomes required, `npm i` on any machine other than a Mac will fail.

Since there currently isn't a fix for this just yet, we've employed [a workaround](https://github.com/npm/npm/issues/2679#issuecomment-150084700) of just deleting the optional dependency from the shrinkwrap and then manually listing it under `optionalDependencies`. The problem with this is that while it's easy to _take_ it out, it's difficult to _keep_ it out. Because TravisCI doesn't support running a build on Windows to ensure functionality, we have to get a little manual and just make sure `fsevents` isn't included in the shrinkwrap. Even though this isn't going to be exhaustive, it's at least a start.

That's where the `npm run fsevents` command comes into play. It checks to make sure `fsevents` isn't present in the `npm-shrinkwrap.json` file. If it fails, you'll need to manually go into the file, find the `fsevents` property, and delete the entire nested object. This should only be necessary if the shrinkwrap file is ever rewritten, so usually only if you're modifying dependencies (upgrading a module, installing a new module, or deleting an unnecessary dependency).
