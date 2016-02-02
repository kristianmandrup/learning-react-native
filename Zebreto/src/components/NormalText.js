'use strict';
import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';

import {fonts, scalingFactors} from './../styles/fonts';
import Dimensions from 'Dimensions';
let {width} = Dimensions.get('window');

export default class NormalText extends Component {
  displayName = 'NormalText';

  static propTypes = {
    style: View.propTypes.style
  };

  render() {
    return (
      <Text style={[this.props.style, fonts.normal, scaled.normal]}>
        {this.props.children}
      </Text>
      );
  }
}

const scaled = StyleSheet.create({
  normal: {
    fontSize: width / scalingFactors.normal
  }
});

