import React from 'react-native';

const { Dimensions, Image, PanResponder, StyleSheet, Text, View, TouchableWithoutFeedback } = React;

export const Topbar = React.createClass({
  propTypes: {
    flip: React.PropTypes.bool.isRequired,
    mock: React.PropTypes.bool.isRequired,
    mockSpeed: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    moy: React.PropTypes.number.isRequired,
    speedFactor: React.PropTypes.number.isRequired,
    mode: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
  },
  cleanupSpeed(s) {
    return s * this.props.speedFactor;
  },
  render() {
    const width = Dimensions.get('window').width;
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();
    const date = (hours < 10 ? `0${hours}` : hours)+ ':' + (minutes < 10 ? `0${minutes}` : minutes);
    return (
      <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'stretch',
          alignSelf: 'flex-end',
          height: 60,
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
          transform: [{
            scaleX: this.props.flip ? -1 : 1
          }, {
            scaleY: 1
          }] }}>
        <View style={{ flex: 1, flexDirection: 'row', width: width - 150 }}>
          <Text style={{ color: this.props.textColor, fontSize: 30, paddingTop: 10 }}>max: </Text>
          <Text style={{ color: this.props.textColor, fontSize: 50 }}>
            {this.props.mock ? this.props.mockSpeed : this.cleanupSpeed(this.props.max).toFixed(0)}
          </Text>
          <Text style={{ color: this.props.textColor, fontSize: 17, paddingTop: 18 }}> {this.props.mode}</Text>
          <View style={{ width: 10 }}></View>
          <Text style={{ color: this.props.textColor, fontSize: 30, paddingTop: 10 }}>moy: </Text>
          <Text style={{ color: this.props.textColor, fontSize: 50 }}>
            {this.props.mock ? this.props.mockSpeed : this.cleanupSpeed(this.props.moy).toFixed(0)}
          </Text>
          <Text style={{ color: this.props.textColor, fontSize: 17, paddingTop: 18 }}> {this.props.mode}</Text>
        </View>
        <Text style={{ color: this.props.textColor, fontSize: 50 }}>{date}</Text>
      </View>
    );
  }
});

export const NewTopbar = React.createClass({
  propTypes: {
    flip: React.PropTypes.bool.isRequired,
    mock: React.PropTypes.bool.isRequired,
    mockSpeed: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    moy: React.PropTypes.number.isRequired,
    speedFactor: React.PropTypes.number.isRequired,
    mode: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
  },
  cleanupSpeed(s) {
    return s * this.props.speedFactor;
  },
  render() {
    const width = Dimensions.get('window').width;
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();
    const date = (hours < 10 ? `0${hours}` : hours)+ ':' + (minutes < 10 ? `0${minutes}` : minutes);
    return (
      <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'stretch',
          alignSelf: 'flex-end',
          height: 60,
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
          transform: [{
            scaleX: this.props.flip ? -1 : 1
          }, {
            scaleY: 1
          }] }}>
        <View style={{ flex: 1, flexDirection: 'row', width: width - 150 }}>
          <Text style={{ color: this.props.textColor, fontSize: 30, paddingTop: 7, opacity: 0.9 }}>max</Text>
          <Text style={{ color: this.props.textColor, fontSize: 30, paddingTop: 12, opacity: 0.9 }}>/</Text>
          <Text style={{ color: this.props.textColor, fontSize: 30, paddingTop: 17, opacity: 0.9 }}>moy </Text>
          <View style={{ width: 20 }}></View>
          <Text style={{ color: this.props.textColor, fontSize: 50, paddingTop: 0 }}>
            {this.props.mock ? this.props.mockSpeed : this.cleanupSpeed(this.props.max).toFixed(0)}
          </Text>
          <Text style={{ color: this.props.textColor, fontSize: 30, paddingTop: 14, opacity: 0.9 }}> / </Text>
          <Text style={{ color: this.props.textColor, fontSize: 50, paddingTop: 7 }}>
            {this.props.mock ? this.props.mockSpeed : this.cleanupSpeed(this.props.moy).toFixed(0)}
          </Text>
          <Text style={{ color: this.props.textColor, fontSize: 17, paddingTop: 22, opacity: 0.9 }}> {this.props.mode}</Text>
        </View>
        <Text style={{ color: this.props.textColor, fontSize: 50 }}>{date}</Text>
      </View>
    );
  }
});
