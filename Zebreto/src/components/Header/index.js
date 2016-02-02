import React, {
  Component,  
  View,
  Image
} from 'react-native';

import styles from './styles';
import HeadingText from './../HeadingText';

export default class Header extends Component {
  displayName = 'Header';

  render() {
    return (
      <View style={styles.header}>
        <Image source={require('image!iTunesArtwork')} style={styles.logo}/>
        <HeadingText>ZEBRETO</HeadingText>
      </View>
      );
  }
}
