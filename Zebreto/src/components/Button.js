import React, {
  StyleSheet,
  Component,
  View,
  TouchableOpacity
} from 'react-native';

import colors from './../styles/colors';

export default class Button extends Component {
  displayName = 'Button';

  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    style: View.propTypes.style,
    children: React.PropTypes.object,
    disabled: React.PropTypes.bool
  };

  state = {
    disabled: false
  };

  get opacity() {
    return this.props.disabled ? 1 : 0.5;
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.opacity}
        onPress={this.props.onPress}
        style={[styles.wideButton, this.props.style]}>
        {this.props.children}
      </TouchableOpacity>
      );
  }
}


const styles = StyleSheet.create({
  wideButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: colors.pink
  }
});
