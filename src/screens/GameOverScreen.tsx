import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';
import { RouteProp } from '@react-navigation/native';

type GameOverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameOver'>;
type GameOverScreenRouteProp = RouteProp<RootStackParamList, 'GameOver'>;

// Props type definition for component, assuming scores are passed as props
type GameOverScreenProps = {
    navigation: GameOverScreenNavigationProp;
    route: GameOverScreenRouteProp
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({navigation, route}) => {
    const {playerOneName, playerTwoName, playerOnePoints, playerTwoPoints, points} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Congratulations {playerOneName} and {playerTwoName}!</Text>
        <Text style={styles.scoreText}>{points} team points!!</Text>
        <Text style={styles.scoreText}>{playerOnePoints === playerTwoPoints ?
        "It's a tie for MVP!!!" :
        playerOnePoints > playerTwoPoints ? playerOneName + ' is the MVP!!!!' : playerTwoName + ' is the MVP!!!'}</Text>
        <Text style={styles.scoreText}>{playerOneName} had {playerOnePoints} points!</Text>
        <Text style={styles.scoreText}>{playerTwoName} had {playerTwoPoints} points!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Starting')}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50, // Adjust padding as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Space between title and scores
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    margin: 10, // Space between each score line
  },
  button: {
    width: '60%', // Adjust width as needed
    backgroundColor: '#007bff', // Button color
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space from the bottom edge
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverScreen;
