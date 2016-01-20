import React from 'react-native';
import { startTracking, stopTracking, subscribe } from './speed';

const { StyleSheet, Text, View, TouchableWithoutFeedback } = React;

const themes = [
  { color: 'white', back: 'black' },
  { color: 'Aqua', back: 'black' },
  { color: 'yellow', back: 'black' },
  { color: 'LawnGreen', back: 'black' },
  { color: 'SpringGreen', back: 'black' },
  { color: 'DeepPink', back: 'black' },
  { color: 'black', back: 'white' },
];

export const HUD = React.createClass({
  getInitialState() {
    return {
      debug: false,
      mock: false,
      mockSpeed: 42,
      screen: 'hud',
      theme: 0,
      angle: 0,
      flip: true,
      speed: 0.0,
      actualSpeed: 0.0,
      error: null,
      coords: {
        latitude: 0.0,
        longitude: 0.0,
        speed: 0.0,
      },
      timestamp: Date.now(),
    };
  },
  componentDidMount() {
    this.unsubscribe = subscribe(e => {
      const { speed, timestamp, error, coords } = e;
      if (error) {
        this.setState({ error });
      } else {
        if (speed > 999) {
          this.setState({ speed: 999.0, actualSpeed: speed, error, timestamp, coords });
        } else if (speed < 0) {
          this.setState({ speed: 0.0, actualSpeed: speed, error, timestamp, coords });
        } else {
          this.setState({ speed, actualSpeed: speed, error, timestamp, coords });
        }
      }
    });
    startTracking();
  },
  componentWillUnmount() {
    this.unsubscribe();
    stopTracking();
  },
  flip() {
    this.setState({ flip: !this.state.flip });
  },
  render() {
    const index = parseInt((Math.abs(this.state.theme) % (themes.length - 1)).toFixed(0), 10);
    const backColor = themes[index].back;
    const textColor = themes[index].color;
    const textColorWithWarning = this.state.speed > 133.0 ? 'red' : themes[index].color;
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: backColor }}>
        <TouchableWithoutFeedback onPress={this.flip}>
          <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'black', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', transform: [{ scaleX: this.state.flip ? -1 : 1 }, { scaleY: 1 }, { rotateX: `${this.state.angle}deg` }] }}>
            <Text style={{ letterSpacing: 0, color: textColorWithWarning, fontWeight: 'bold', fontSize: 180, writingDirection: 'rtl' }}>{this.state.mock ? this.state.mockSpeed : this.state.speed.toFixed(0)}</Text>
            <Text style={{ color: textColor, fontSize: 80, marginLeft: 30 }}>km/h</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{ color: textColor, fontSize: 20 }}>{this.state.error ? this.state.error : this.state.timestamp}</Text>
      </View>
    );
  },
});
