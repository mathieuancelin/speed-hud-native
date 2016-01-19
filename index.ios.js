'use strict';

var React = require('react-native');
var { AppRegistry } = React;
var { hudnative } = require('./src/es5/index.ios');

AppRegistry.registerComponent('hudnative', () => hudnative);
