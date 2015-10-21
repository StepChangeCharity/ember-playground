import Ember from 'ember';

export default Ember.Controller.extend({
	
	setup: function() {
           this.get('sockjs').on('messageReceived', this, 'messageReceived');
    }.on('init'),
	
	// Deserialize the JSON object when it is echoed by the node server (causing the sockjs service to fire a messageReceived
	//  event).
	messageReceived: function(message) {
		var obj = JSON.parse(message);
		console.log('Username: ' + obj.username);
		console.log('Password: ' + obj.password);
		var user = { username: obj.username, password: obj.password};
		// Push the object onto the model defined on the login route. To correctly implement data binding Ember's own 'pushObject'
		//   method must be used; the login/view template will not update if just 'push' is used.
		this.get('model').pushObject(user);
	}
});
