import Ember from 'ember';

// Define a model on the route.
// The route should ideally grab the model from elsewhere though I am having trouble getting this to work.
// The model is pre-populated with two example users; the login controller uses the pushObject method to add more when it
//   observes the messageReceived event firing on the sockjs service.
export default Ember.Route.extend({  
    model() {
        let users = [
            {
                username: 'davidk',
                password: 'password1'
            },
            {
                username: 'dkane',
                password: 'password2'
            }
        ];
        return users;
    }
});