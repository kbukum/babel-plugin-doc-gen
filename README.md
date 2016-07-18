# babel plugin doc gen

#### A Docs generation

[![Build Status](https://travis-ci.org/kbukum/babel-plugin-doc-gen.svg?branch=master)](https://travis-ci.org/kbukum/babel-plugin-doc-gen)

##### Motivation

Aims to be a complete solution for query on json and javascript map objects. All coded with ES6 syntax.

##### What's inside

* [Webpack](https://webpack.github.io/) for all development (server,hotload etc.) and build (package, optimize, etc.) needs.
* [Babel](https://babeljs.io/flow) for writing codes with ES6 syntax and transpiling them browser compatible codes. 
* [ESLint](http://eslint.org/) for protecting our nice formatted codes.
* [Flow](http://flowtype.org/) for type checking.
* [Chai](http://chaijs.com/) for asserting test errors.

### Quick Start

#### Install and Usage
Go to your project folder
```shell
npm install babel-plugin-doc-gen --save
```
You can import this project in 2 ways.

1. Partial import. For ex. `import Transformer from "babel-plugin-doc-gen/lib/api/Transformer";`
2. All-in-one, minified, optimized single js. For ex. **TODO: example coming soon.**

* [see api detail for usage](./manual/api.md)

    
#### How to contribute
Clone and run `npm install`. This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### How to Build for Production

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```
 
####  How to run Unit Tests.

```shell
$ npm test
```
