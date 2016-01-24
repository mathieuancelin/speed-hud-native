import React from 'react-native';

const { Dimensions, Text, View } = React;

export const Speed = React.createClass({
  propTypes: {
    flip: React.PropTypes.bool.isRequired,
    angle: React.PropTypes.number.isRequired,
    mode: React.PropTypes.string.isRequired,
    mock: React.PropTypes.bool.isRequired,
    mockSpeed: React.PropTypes.number.isRequired,
    speedFactor: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired,
    panResponder: React.PropTypes.string.isRequired,
    backColor: React.PropTypes.string.isRequired,
    textColorWithWarning: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    panResponder: React.PropTypes.object.isRequired,
  },
  cleanupSpeed(s) {
    return s * this.props.speedFactor;
  },
  render() {
    const width = Dimensions.get('window').width;
    return (
      <View {...this.props.panResponder.panHandlers} style={{
          paddingTop: 50,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: this.propsbackColor,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          transform: [{
            scaleX: this.props.flip ? -1 : 1
          }, {
            scaleY: 1
          }, {
            perspective: 800
          }, {
            rotateX: `${this.props.angle}deg`
          }] }}>
        <Text style={{
          letterSpacing: 0,
          color: this.props.textColorWithWarning,
          fontWeight: 'bold',
          fontSize: 200,
          writingDirection: 'rtl' }}>
          {this.props.mock ? this.props.mockSpeed : this.cleanupSpeed(this.props.speed).toFixed(0)}
        </Text>
        <Text style={{ color: this.props.textColor, fontSize: 80, marginLeft: 30 }}>
          {this.props.mode}
        </Text>
      </View>
    );
  }
});
