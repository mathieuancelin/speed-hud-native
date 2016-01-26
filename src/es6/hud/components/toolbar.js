import React from 'react-native';

const { Dimensions, Image, Text, View, TouchableWithoutFeedback } = React;

const icon = 'data:image/png;base64,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';

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
      <View style={{ width, backgroundColor: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
        <TouchableWithoutFeedback onPress={this.props.toggleMock}>
          <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 0 }}>
            <Image style={{ width: 40, height: 40 }} source={{ uri: icon }} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.props.toggleMode}>
          <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 0 }}>
            <Text style={{ height: 40, fontSize: 30, backgroundColor: 0, color: 'rgb(68, 68, 68)' }}>{this.props.mode}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{ color: 'red', backgroundColor: 0, fontSize: 20, width: this.props.width - 40 }}>{this.props.error ? this.props.error.message : ''}</Text>
      </View>
    );
  }
});
