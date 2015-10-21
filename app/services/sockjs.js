// app/services/sockjs.js

// The below comment will prevent JSHint from complaining about the SockJS global variable where is is used.
/* global SockJS */
import Ember from 'ember';  
var run = Ember.run;  
var socket;

// This service uses the Ember.Evented mixin
// This allows for modules to create events that can be emitted and listened to by other modules to pass information
//  without having routes/templates/components dependent on the listening service.
export default Ember.Service.extend(Ember.Evented, {
      
    setupSockjs: function() {
        // Creates a new SockJS object containing a reference to the custom local socket server passed in as a parameter.
        socket = new SockJS('http://localhost:7000/echo/');
        // The addEventListener method will fire when the SockJS object receives a message.
        // The run.bind callback is used by Ember to keep track of all requests in the run loop correctly.
        socket.addEventListener('message', run.bind(this, function(event) {
            // Create a new event called messageReceived which passes the event.data object.
            // The user-list component will subscribe to the messageReceived event so it can display the new user object passed in.
            this.trigger('messageReceived', event.data);
            console.log(event.data);
        }));
        
    // The 'on(init)' method is an 'observer' which fires when the object is initialized.
    }.on('init'),
    
    // The sendData object accepts a message object which is then sent to the socket server.
    // At this point the server merely echoes the passed JSON data back to the client so it can be picked up by elements
    //   listening to it.
    sendData: function(message) {
        socket.send(message);
        console.log(socket);
    }

});