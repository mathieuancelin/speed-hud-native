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
      mock: true,
      mockSpeed: 142,
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
        const duration = Date.now() - this.state.timestamp;
        const diff = Math.abs(this.state.speed - speed);
        if (diff > 40 && duration <= 3000) { // if 40km diff in less than 3 sec
          this.setState({
            error: {
              code: 'GPS_ERROR',
              message: 'Precision error',
            },
            actualSpeed: speed,
          });
        } else {
          if (speed > 999) {
            this.setState({ speed: 999.0, actualSpeed: speed, error, timestamp, coords });
          } else if (speed < 0) {
            this.setState({ speed: 0.0, actualSpeed: speed, error, timestamp, coords });
          } else if (speed > 0 && speed < 12) {
            this.setState({ speed: 0.0, actualSpeed: speed, error, timestamp, coords });
          } else {
            this.setState({ speed, actualSpeed: speed, error, timestamp, coords });
          }
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
    console.log('flip');
    this.setState({ flip: !this.state.flip });
  },
  render() {
    const index = parseInt((Math.abs(this.state.theme) % (themes.length - 1)).toFixed(0), 10);
    const backColor = themes[index].back;
    const textColor = themes[index].color;
    const textColorWithWarning = this.state.speed > 133.0 ? 'red' : themes[index].color;
    return (
      <TouchableWithoutFeedback onPress={this.flip}>
        <View style={{ backgroundColor: 'black', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', transform: [{ scaleX: this.state.flip ? -1 : 1 }, { scaleY: 1 }] }}>
          <Text style={{ color: textColorWithWarning, fontSize: 180, writingDirection: 'rtl' }}>{this.state.mock ? this.state.mockSpeed : this.state.speed.toFixed(0)}</Text>
          <Text style={{ color: textColor, fontSize: 80 }}>km/h</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },
});
