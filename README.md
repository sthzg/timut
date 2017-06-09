# Timut

> Simple timing utils for a poor man's toolbox.
 
 ## Example
 
 ```javascript
// in somefile.js 
require('timut').push('just a message');

// in anotherfile.js
require('timut').push('another message');

// wherever
require('timut').log();
```

`.log()` will output a table including time deltas to the console.

```
Time          |  Context     |  Message                                                       |  Rel. Delta  |  Abs. Delta
--------------------------------------------------------------------------------------------------------------------------
00:01:01:007  |  default...  |  just a message..............................................  |         0ms  |         0ms
00:01:05:275  |  default...  |  another message.............................................  |       +12ms  |       +12ms
```

This is not fancy, but sometimes useful as a quicker and less complicated inspection tool than
full-blown profilers.

## API

See exports in [index.ts](https://github.com/sthzg/timut/blob/develop/src/index.ts).
