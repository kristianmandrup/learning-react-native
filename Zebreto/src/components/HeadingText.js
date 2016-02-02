import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';;

import {fonts, scalingFactors} from './../styles/fonts';
import Dimensions from 'Dimensions';
let {width} = Dimensions.get('window');

export default class HeadingText extends Component {
  displayName = 'HeadingText',

  static propTypes = {
    style: View.propTypes.style
  };

  render() {
    return (
      <Text style={[this.props.style, fonts.big, scaled.big]}>
        {this.props.children}
      </Text>
      );
  }
});

const scaled = StyleSheet.create({
  big: {
    fontSize: width / scalingFactors.big
  }
});

