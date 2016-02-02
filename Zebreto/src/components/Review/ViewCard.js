import React, {
  StyleSheet,
  Component,
  View
} from 'react-native';;

import Button from './../Button';
import NormalText from './../NormalText';
import HeadingText from './../HeadingText';

import { CardActions } from './../../actions';

import colors from './../../styles/colors';

class ContinueButton extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    wasCorrect: React.PropTypes.bool.isRequired
  };

  get text() {
    return this.props.wasCorrect ? 'Correct! Next card?' : 'Oops, not quite. Next card?';
  }

  render() {
    // TODO: refactor!!
    return (
      <Button onPress={this.props.onPress} style={styles.continueButton}>
        <NormalText>{this.text}</NormalText>
      </Button>
      );
  }
}

export default class ViewCard extends Component {
  displayName = 'ViewCard';

  static propTypes = {
    continue: React.PropTypes.func.isRequired,
    quit: React.PropTypes.func.isRequired,
    onReview: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    cardID: React.PropTypes.string.isRequired,
    answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    correctAnswer: React.PropTypes.string.isRequired,
    prompt: React.PropTypes.string.isRequired
  };

  state = {
    showingAnswer: false,
    wasCorrect: null
  };

  _continue() {
    this.setState(this.getInitialState());
    this.props.continue();
  }

  _selectAnswer(correct) {
    this.props.onReview(correct);
    this.setState({
      showingAnswer: true,
      wasCorrect: correct
    });
    CardActions.review(this.props.cardID, this.props.orientation, correct)
  }

  _buttons() {
    if (!this.props.answers) {
      return null;
    }

    return this.props.answers.map((a) => {
      let isCorrectAnswer = a === this.props.correctAnswer;
      let buttonStyle = [styles.options];
      if (this.state.showingAnswer && isCorrectAnswer) {
        if (this.state.wasCorrect) {
          buttonStyle.push(styles.rightAnswer);
        }
        else {
          buttonStyle.push(styles.wrongAnswer);
        }
      }
      return (
        <Button
          key={a}
          disabled={this.state.showingAnswer}
          style={buttonStyle}
          onPress={this._selectAnswer.bind(this, a === this.props.correctAnswer)}>
          <NormalText>
            {a}
          </NormalText>
        </Button>
        );
    });
  }

  render() {
    var buttons = this._buttons();
    return (
      <View>
        <HeadingText>
          {this.props.prompt}
        </HeadingText>
        {buttons}
        {
          this.state.showingAnswer
          ? <ContinueButton onPress={this._continue}
                            wasCorrect={this.state.wasCorrect}/>
          : <Button onPress={this.props.quit} style={styles.continueButton}>
              <NormalText>Stop Reviewing</NormalText>
            </Button>
        }
      </View>
      );
  }
}

const styles = StyleSheet.create({
  options: {
    backgroundColor: '#FFFFFF'
  },
  continueButton: {
    backgroundColor: colors.tan
  },
  rightAnswer: {
    backgroundColor: colors.green
  },
  wrongAnswer: {
    backgroundColor: colors.pink
  }
});