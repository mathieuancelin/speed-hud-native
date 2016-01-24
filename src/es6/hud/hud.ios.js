import React from 'react-native';
import { startTracking, stopTracking, subscribe } from './speedwatcher';
import { Toolbar } from './components/toolbar';
import { Topbar, NewTopbar } from './components/topbar';
import { Speed } from './components/speed';

const { Dimensions, Image, PanResponder, StyleSheet, Text, View, TouchableWithoutFeedback } = React;

const themes = [
  { color: 'white', back: 'black' },
  { color: 'Aqua', back: 'black' },
  { color: 'yellow', back: 'black' },
  { color: 'LawnGreen', back: 'black' },
  { color: 'SpringGreen', back: 'black' },
  { color: 'DeepPink', back: 'black' },
  { color: 'black', back: 'white' },
  { color: 'black', back: 'white' },
];

function cleanupArray(arr) {
  if (arr.length > 600) {
    return [...arr].splice(0, arr.length - 600);
  }
  return arr;
}

export const HUD = React.createClass({
  getInitialState() {
    return {
      mode: 'km/h',
      speedFactor: 1.0,
      moy: 0,
      moyArr: [],
      lastMoy: 0,
      mock: false,
      max: 0,
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
      gesture: 'none',
    };
  },
  onPanResponderGrant(evt, gestureState) {
    this.setState({ gesture: 'started' });
  },
  onPanResponderMove(evt, gestureState) {
    if (this.state.gesture === 'started') {
      if (Math.abs(gestureState.vx) < 1 && Math.abs(gestureState.dy) > 10) {
        if (gestureState.dy > 0 && this.state.angle > -45) {
          this.setState({ angle: this.state.angle - 1 });
        } else if (gestureState.dy < 0 && this.state.angle < 45) {
          this.setState({ angle: this.state.angle + 1 });
        }
      }
      if (Math.abs(gestureState.vx) > 3.5) {
        if (gestureState.vx > 0) {
          this.setState({ theme: this.state.theme + 1, gesture: 'done' });
        } else {
          this.setState({ theme: this.state.theme - 1, gesture: 'done' });
        }
      }
    }
  },
  onPanResponderRelease(evt, gestureState) {
    this.setState({ gesture: 'none' });
    const { dx, dy, vx, vy } = gestureState;
    if (dx === 0 && dy === 0 && vx === 0 && vy === 0) {
      this.flip();
    }
  },
  cleanupSpeed(s) {
    return s * this.state.speedFactor;
  },
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
      onShouldBlockNativeResponder: () => true,
    });
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
          let max = this.state.max;
          if (speed > max) {
            max = speed;
          }
          this.setState({ speed, max, actualSpeed: speed, error, timestamp, coords });
        }
      }
      const now = Date.now();
      if (now - this.state.lastMoy > 10000) {
        const moy = this.state.moyArr.length > 0 ?
          this.state.moyArr.reduce((a, b) => a + b) / this.state.moyArr.length :
          0;
        this.setState({ moyArr: cleanupArray([...this.state.moyArr, this.state.speed]), lastMoy: Date.now(), moy: moy < 0 ? 0 : moy });
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
  toggleMode() {
    if (this.state.mode === 'km/h') {
      this.setState({ mode: 'mph', speedFactor: 0.621371 });
    } else {
      this.setState({ mode: 'km/h', speedFactor: 1.0 });
    }
  },
  toggleMock() {
    this.setState({ mock: !this.state.mock });
  },
  render() {
    const index = parseInt((Math.abs(this.state.theme) % (themes.length - 1)).toFixed(0), 10);
    const backColor = themes[index].back;
    const textColor = themes[index].color;
    const textColorWithWarning = this.cleanupSpeed(this.state.speed) > this.cleanupSpeed(133.0) ? 'red' : themes[index].color;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: backColor }}>
        <NewTopbar {...this.state} textColor={textColor} />
        <Speed {...this.state}
          panResponder={this.panResponder}
          backColor={backColor}
          textColor={textColor}
          textColorWithWarning={textColorWithWarning} />
        <Toolbar
          mode={this.state.mode}
          error={this.state.error}
          toggleMode={this.toggleMode}
          toggleMock={this.toggleMock} />
      </View>
    );
  },
});
