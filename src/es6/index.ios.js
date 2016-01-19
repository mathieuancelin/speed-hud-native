import React from 'react-native';
import { HUD } from './hud/hud.ios';

export const hudnative = React.createClass({
  render: function() {
    return (
      <HUD />
    );
  }
});
