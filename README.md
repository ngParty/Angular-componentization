<p align="center">
    <img src="https://pbs.twimg.com/profile_images/2660272602/87a5a0fdc86455c3f94b0b0eebfdb1b9_400x400.png" alt="typescript" width="150px">
    <img src="https://avatars1.githubusercontent.com/u/3802108?v=3&s=400" alt="jspm" width="150px">
    <img src="https://github.com/angular/angular.js/blob/master/images/logo/AngularJS-Shield.exports/AngularJS-Shield-medium.png?raw=true" alt="angular" width="150px">
</p>


___

# TOC
* [Walkthrough](#walkthrough)
    * [File structure](#file-structure)
    * [Testing setup](#testing-setup)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
        * [Gulp tasks](#gulp-tasks)
        * [Testing](#testing)

# Walkthrough

## File Structure
We use the component approach in NG6. This will be a standard if using the new router in angular and a great way to ensure easy transition to Angular 2. Everything or mostly everything is a component. A component is a self contained app basically. It has its own style, template, controllers, routing, specs, etc. All capsulated in its own folder. Here's how it looks:
```
client
--app/
----app.ts * entry file for app
----app.html * template for app
----components/ * where most of components live
------components.ts * entry file for components
------home/ * home component
--------home.ts * home entry file
--------home.component.ts * directive for home
--------home.controller.ts * controller for home
--------home.css * styles for home
--------home.html * template for home
--------home.spec.ts * specs for home
----common/ * where common things in our app live
```

## Testing Setup

To run test just `npm test` or `karma start`. Read more about testing [below](#testing)


# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm`
Once you have those, you should install these globals with `npm i -g`:
* `jspm`
* `tsd`
* `gulp`
* `karma`
* `karma-cli`

## Installing
* `fork` me
* `clone` your fork
* `git checkout jspm-typescript`
* `npm i` to install all dependencies
* (with JSPM there's usually a `jspm install` step too, but that is added to npm's `postinstall` for convenience)

#### Failing `npm install`
If this is your first time running JSPM, you'll probably run into a `warn Error - GitHub rate limit reached`

Fix this by adding your GitHub credentials to JSPM with: `jspm registry config github`.

## Running the app
NG6 uses Gulp to build and start the dev environment. After you have installed all dependencies you can now run the app.
Run `gulp` to start a dev server, compile typescript and watch all files. The port will displayed to you.

### Gulp tasks
Without Webpack's required build step, serving is easy and you choose when you are ready to build now

Here's a list of possible Gulp task to run:
* `serve` (also default `gulp`)
  * starts a dev server with `browser-sync` serving the client folder and listens for changes
* `build`
  * bundles our app into a single file with all included dependencies into `dist/`. both minified and unminified included
* `component`
  * builds out boilerplate for a new angular component, [read below](#generating-components) to see how to use this in more detail

### Testing
To run test, just run `npm test` or `karma start`.

The only difference from a regular `Karma` setup is the use of [`karma-jspm`](https://github.com/Workiva/karma-jspm) plugin to let JSPM handle spec files as modules. `Karma` will run all files that match `.spec.js` inside the `app` folder. This is awesome because we can write tests for our components in the same folder with the rest of the component. Be sure to include your `spec` files in the appropriate component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` extension, you must change the `jspm.loadFiles` glob in `karma.conf.js` to look for whatever file(s) you want.

`Mocha` is the testing suite being used and `chai` is the assertion library. If you would like to change this, do so in `karma.conf.js`.

