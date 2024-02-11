import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';

type GameOverScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// Props type definition for component, assuming scores are passed as props
type GameOverScreenProps = {
    navigation: GameOverScreenNavigationProp;
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Team Score: </Text>
        <Text style={styles.scoreText}>Player 1 Score: </Text>
        <Text style={styles.scoreText}>Player 2 Score: </Text>
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
