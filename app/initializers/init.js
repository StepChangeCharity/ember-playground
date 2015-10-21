// Injects the sockjs service into all components and controllers
// The use of controllers is in the process of deprecation, but since the login.js controller shares a scope with its route
//   file where its model is kept, and I'm not sure if injecting the service into the route is a good idea, this is the best
//   way I've found to do it.
export function initialize(application) {  
   application.inject('component', 'sockjs', 'service:sockjs');
   application.inject('controller', 'sockjs', 'service:sockjs');
}

export default {
  name: 'websockets',
  initialize: initialize
};