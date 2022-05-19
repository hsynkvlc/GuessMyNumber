import React from 'react';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}>
      <ImageBackground
        style={styles.rootScreen}
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
