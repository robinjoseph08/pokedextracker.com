# pokedextracker.com

[![Build Status](https://travis-ci.org/robinjoseph08/pokedextracker.com.svg?branch=master)](https://travis-ci.org/robinjoseph08/pokedextracker.com)

A website to track your completion of a Living Pokedex.

## Install

This project has only been tested to work with Node.js v5 (though it might work for other versions), so make sure you have it installed and active when running this application.

```bash
$ nvm install 5
$ nvm use 5
$ npm i
```

If you have [avn](https://github.com/wbyoung/avn) setup, the `.node-version` file should automatically switch the version for you.

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
