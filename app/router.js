import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', { path: '/' }, function() {
    this.route('new', {});
    this.route('view', {});
  });
});

export default Router;
