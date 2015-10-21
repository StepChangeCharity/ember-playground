import Ember from 'ember';

export default Ember.Component.extend({
	
	// On clicking the button in the login-form component, the 'submitForm' action will execute with username/password
	//   parameters taken from the two input fields on the form.
	// Those parameters are serialized to JSON and passed to the sockjs service for sending to the node server via the defined
	//   sockets.
	actions: {
		
		submitForm: function(username, password) {
            var send = this.get('sockjs');
			var json = {
				username: username,
				password: password
			};
			var stream = JSON.stringify(json);
            send.sendData(stream);
        }
	}
});