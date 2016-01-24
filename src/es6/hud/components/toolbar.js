import React from 'react-native';

const { Dimensions, Image, Text, View, TouchableWithoutFeedback } = React;

export const Toolbar = React.createClass({
  propTypes: {
    toggleMock: React.PropTypes.func.isRequired,
    toggleMode: React.PropTypes.func.isRequired,
    mode: React.PropTypes.string.isRequired,
  },
  getDefaultProps() {
    return {
      error: null,
    };
  },
  render() {
    const width = Dimensions.get('window').width;
    return (
      <View style={{ width, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
        <TouchableWithoutFeedback onPress={this.props.toggleMock}>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Image style={{ width: 40, height: 40 }} source={require('../../../static/speedometer.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.props.toggleMode}>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ height: 40, fontSize: 30, color: 'rgb(68, 68, 68)' }}>{this.props.mode}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{ color: 'red', fontSize: 20, width: this.props.width - 40 }}>{this.props.error ? this.props.error.message : ''}</Text>
      </View>
    );
  }
});
