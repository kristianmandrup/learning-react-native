// See: https://github.com/egor-smirnov/egorsmirnov.me-examples
// blob/master/react-and-es6-part-2/cartItem.jsx

import React, {
  StyleSheet,
  Component,
  View
} from 'react-native';

import Button from './../Button';
import NormalText from './../NormalText';
import Input from './../Input';

import colors from './../../styles/colors';

class CreateDeckButton extends Component {
  render() {
    return (
      <Button
        style={styles.createDeck}
        onPress={this.props.onPress}>
        <NormalText>Create Deck</NormalText>
      </Button>
      );
  }
});

class EnterDeck extends Component {
  static propTypes = {
    create: React.PropTypes.func.isRequired
  };

  state = {
    text: ''
  };

  _create() {
    // ???
    this.props.create(this.state.text);
  }

  render() {
    return (
      <View style={styles.enterDeck}>
        <Input onEntry={this.props.create}
          onChange={(text) => {this.setState({text});}}/>
        <CreateDeckButton onPress={this._create}/>
      </View>
      );
  }
}

export default class DeckCreation extends Component {
  static propTypes = {
    newDeck: React.PropTypes.func.isRequired
  };

  state = {
    showingNameField: false
  };

  _newDeck(name) {
    this.state.newDeck(name);
    this.setSate(DeckCreation.state);
  }

  _showField() {
    this.setState({showingNameField: true});
  }

  render() {
    var contents = this.state.showingNameField
      ? <EnterDeck create={this._newDeck}/>
      : <CreateDeckButton onPress={this._showField}/>
      ;
    return contents;
  }
}

const styles = StyleSheet.create({
  nameField: {
    backgroundColor: colors.tan,
    height: 40
  },
  wideButton: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    margin: 10
  },
  createDeck: {
    backgroundColor: colors.green
  }
});
