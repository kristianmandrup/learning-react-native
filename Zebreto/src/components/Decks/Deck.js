// See: https://github.com/egor-smirnov/egorsmirnov.me-examples
// blob/master/react-and-es6-part-2/cartItem.jsx

'use strict';

import React, {
  StyleSheet,
  Component,
  View
} from 'react-native';

import DeckModel from './../../data/Deck';

import Button from './../Button';
import NormalText from './../NormalText';

import colors from './../../styles/colors';

export default class Deck extends Component {
  displayName = 'Deck';

  // Used for validating properties used to set state
  static propTypes = {
    onReview: React.PropTypes.func.isRequired,
    deck: React.PropTypes.instanceOf(DeckModel),
    addCards: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  _review() {
    this.state.onReview(this.state.deck.id);
  }

  _addCards() {
    this.state.addCards(this.state.deck);
  }

  render() {
    return (
      <View style={styles.deckGroup}>

        <Button style={styles.deckButton} onPress={this._review}>
          <NormalText>
            {this.state.deck.name}: {this.state.deck.dueCards} due
          </NormalText>
        </Button>

        <Button style={styles.editButton}
          onPress={this._addCards}>
          <NormalText>+</NormalText>
        </Button>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  deckGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 10,
    marginBottom: 5
  },
  deckButton: {
    backgroundColor: colors.pink,
    padding: 10,
    margin: 0,
    flex: 1
  },
  editButton: {
    width: 60,
    backgroundColor: colors.pink2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
    flex: 0
  }
});
