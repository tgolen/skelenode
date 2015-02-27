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

# Pieces
Skelenode uses several sub-components to do most of the work:

* [skelenode-socket](https://github.com/tgolen/skelenode-socket) To allow socket connections to the RESTful API
* [skelenode-model](https://github.com/tgolen/skelenode-model) Models for storing and dealing with data, also contains the entry points for most APIs
* [skelenode-dispatcher](https://github.com/tgolen/skelenode-dispatcher) A pub/sub mechanism that uses Redis behind the scnenes
* [skelenode-swagger](https://github.com/tgolen/skelenode-swagger) To use a consistent API framework that also allows integration with Swagger UI for autmatic API documentation
* [skelenode-api](https://github.com/tgolen/skelenode-api) A client-side library to communicate with the RESTful API either via XHR or web sockets

# Contributing
Open a pull request with plenty of well-written instructions on what you are submitting and why you are submitting it
