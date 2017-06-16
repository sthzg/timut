# Timut

[![npm version](https://badge.fury.io/js/timut.svg)](https://badge.fury.io/js/timut)

> Simple timing utils for a poor man's toolbox.
 
 ## Install
 
 ```bash
yarn add --dev timut@next # npm install --save-dev timut@next
```
 
 
 ## Example
 
 ```javascript
// in somefile.js 
require('timut').push('just a message');

// in anotherfile.js
require('timut').push('another message');

// ...push as many messages as required

// wherever
require('timut').log();
```

`.log()` will output a table including time deltas to the console.

```
Time          |  Context     |  Message               |  Rel. Delta  |  Abs. Delta
----------------------------------------------------------------------------------
00:01:01:007  |  default...  |  just a message......  |         0ms  |         0ms
00:01:01:019  |  default...  |  another message.....  |       +12ms  |       +12ms
00:01:01:023  |  default...  |  yet another thing...  |        +4ms  |       +16ms
```

This is not fancy, but sometimes useful as a quicker and less complicated inspection tool than
full-blown profilers.

The `require('timut')` syntax is recommended, as it easily allows simple `sed` commands to remove
all occurrences in the complete codebase.

### Contexts

```javascript
// You can push messages to different contexts
require('timut').push('hello, message'); // pushes to context `default`
require('timut').push('another context', 'foo'); // pushes to context `foo`

// .log() takes an optional argument to log a context
require('timut').log('foo'); // logs all messages in context `foo`

// to remove all entries for a context
require('timut').resetContext('foo');

// or to reset all contexts
require('timut').reset();
```

## Library Target

The library can be used in ES2015-environments (e.g. Babel) and Typescript. Providing an ES5-bundle
is on the todo list.

## API

See exports in [index.ts](https://github.com/sthzg/timut/blob/develop/src/index.ts).

## Use Case

The original use case behind the library was debugging asynchronous Karma tests running in
PhantomJS, transpiled by Babel and bundled by Webpack. The node debugger was not working reliably.
Inspecting by logging to console has been a pragmatic workaround. 

To inspect the timing and application flow `timut` provides a 'trash-it-after-usage' approach and 
simply a quick way to get an idea about where some code spends its time.
