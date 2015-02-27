# Skelenode

This is a full-stack server with the following pieces:

* RESTful API with automatic documentation provided by http://swagger.io/
* Static web server to serve whatever front-end you want
* MongoDB connector for data models
* Socket.IO interface (can access the RESTful API through this interface)
* Event Dispatcher using http://redis.io/

# Installation
```
npm install skelenode
```

# Usage
```
var skelenode = require('skelenode');
skelenode.start();
```

# Contributing
Open a pull request with plenty of well-written instructions on what you are submitting and why you are submitting it
