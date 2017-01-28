# pokedextracker.com

[![Build Status](https://travis-ci.org/robinjoseph08/pokedextracker.com.svg?branch=master)](https://travis-ci.org/pokedextracker/pokedextracker.com)

A website to track your completion of a Living Pokedex.

## Install

This project has been tested to work with Node.js v5 and v6 (though it might work for other versions), so make sure you have one of them installed and active when running this application.

### Unix

When on Linux or Mac OS X, we recommend using [`nvm`](https://github.com/creationix/nvm) so that you can easily switch between Node versions. This is so that they don't conflict with each other when working on different Node projects.

```bash
$ nvm install 5
$ nvm use 5
$ npm i
```

If you have [`avn`](https://github.com/wbyoung/avn) setup, the `.node-version` file should automatically switch the version for you.

Keep in mind though that `nvm` is not required to run this application.

### Windows

While there is [`nvm` for Windows](https://github.com/coreybutler/nvm-windows), we've seen some people having issues with later versions of Node (for example, `npm` isn't an available command after running `nvm install 5`). So instead, it might just be easier to install Node using the [Windows Installer](https://nodejs.org/en/download/current/). Once you have both Node and `npm` installed, then you should be able to just install the dependencies.

```dos
> npm i
```

## Running

To run the development server to test it locally, you only need to run:

```bash
$ npm start
```

Once the bundle becomes valid, you should be able to go to [http://localhost:8080](http://localhost:8080) to view it.

## Linting

To ensure your files are following the preferred style guide, you can run:

```bash
$ npm run lint
```

This is run on Travis whenever a commit is made so if you're going to [contribute](CONTRIBUTING.md), you should make sure your files pass the linter.
