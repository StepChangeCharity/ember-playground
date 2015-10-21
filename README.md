# ember.js Playground

## Prerequisites

* NodeJS

## Notes

The app connects to a custom local Node server.

We can set one up using the commands

```
$ npm init
$ npm install sockjs --save
```

and in app.js,

```
// app.js
var http = require('http');  
var sockjs = require('sockjs');


var clients = {};

// Broadcast to all clients
function broadcast(message){  
  // iterate through each client in clients object
  for (var client in clients){
    // send the message to that client
    clients[client].write(message);
  }
}

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });  
echo.on('connection', function(conn) {  
    clients[conn.id] = conn;

    conn.on('data', function(message) {
        console.log('received ' + message);
        broadcast(message);
    });
    conn.on('close', function() {
        delete clients[conn.id];
        });
    console.log("connected");
});

var server = http.createServer();  
echo.installHandlers(server, {prefix:'/echo'});  
server.listen(7000, '0.0.0.0');
```

At the moment this just echoes any message it receives back to any subscribed clients.

The sockjs package was installed in this projust using Bower.

The SockJS package, being a non-AMD asset, is imported in the ember-cli-build.js thusly:

```
// ember-cli-build.js"
...
 app.import('bower_components/sockjs/sockjs.min.js');
...
```
		
making SockJS a global variable usable anywhere in the application without an import statement.

JSHint tends to complain anytime SockJS is used in the application, which we can fix by including the comment

```
/* global SockJS */
```
		
to the top of any file it's used in.

The Ember CLI Content Security Policy will also throw up some complaints - have added this to the config/environment.js file:

```
// config/environment.js
...
APP: {  
      // Here you can pass flags/options to your application instance
      // when it is created
    },
           contentSecurityPolicy: {
              'default-src': "'none'",
              'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
              'font-src': "'self'",
              'connect-src': "'self' ws://localhost:7000 localhost:7000",
              'img-src': "'self'",
              'report-uri':"'localhost'",
              'style-src': "'self' 'unsafe-inline'",
              'frame-src': "'none'"
            }
...
```
The above may not be immediately apparent from looking at the project files.
I have tried to document the routing, templates, components and services files as fully as possible.

The jsconfig.json file in the project root target the app for ES6, so you won't get syntax errors while editing in VS Code.

```
{
    "compilerOptions": {
        "target": "ES6"
    }
}
```
 
	 
	

