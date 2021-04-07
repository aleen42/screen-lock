## screen-lock.js

![javascript](https://badges.aleen42.com/src/javascript.svg)

A simple implementation of the screen lock feature but is quite safe because all DOM nodes have been extracted into memory via `$.fn.detach`, which means that you can't restore it easily unless you can access the memory. It is easily imported to use:

```js
const lock = require('screen-lock');
const unlock = lock();

// append a locking mask in the body
// ...

// hide mask and unlock after prompt
unlock();
```

Here you can also check [the demo](https://codepen.io/aleen42/pen/WNRZQqg).

### :fuelpump: How to contribute

Have an idea? Found a bug? See [how to contribute](https://wiki.aleen42.com/contribution.html).

### :scroll: License

[MIT](https://wiki.aleen42.com/MIT.html) © aleen42
