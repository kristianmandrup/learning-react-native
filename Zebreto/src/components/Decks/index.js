import React, {
  StyleSheet,
  Component,
  View
} from 'react-native';

import Reflux from 'reflux';
import DeckMetaStore from './../../stores/DeckMetaStore';
import CardsStore from './../../stores/CardsStore';
import { DeckActions, CardActions } from './../../actions';
import DeckModel from './../../data/Deck';

import Deck from './Deck';
import Button from './../Button';
import NormalText from './../NormalText';

import DeckCreation from './DeckCreation';

const reactMixin = import('react-mixin');

const mixin = Reflux.listenTo(DeckMetaStore, 'onDecksChange');

reactMixin(Decks.prototype, mixin);

export default class Decks extends Component {
  displayName = 'Decks';

  state = {
    decks: []
  };

  static propTypes = {
    createdDeck: React.PropTypes.func.isRequired,
    review: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    CardsStore.emit();
    DeckMetaStore.emit();
  }

  onDecksChange(decks) {
    this.setState({
      decks: decks
    });
  }

  _newDeck(newDeckName) {
    let deck = new DeckModel(newDeckName);
    DeckActions.createDeck(deck);
    this.props.createdDeck(deck);
  }

  _getDecks() {
    if (!this.state.decks) {
      return null;
    }

    return this.state.decks.map((deck) => {
      return (
        <Deck
          deck={deck}
          addCards={this.props.createdDeck}
          onReview={this.props.review}
          key={deck.id} />);
    });
  },

  deleteAll() {
    DeckActions.deleteAllDecks();
    CardActions.deleteAllCards();
  }

  render() {
    return (
      <View style={styles.container}>
        {this._getDecks()}
        <DeckCreation newDeck={this._newDeck}/>
        {/*
        <Button onPress={this.deleteAll}>
          <NormalText>Delete All the Things</NormalText>
        </Button>
        */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

