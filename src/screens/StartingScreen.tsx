import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';

type StartingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type StartingScreenProps = {
    navigation: StartingScreenNavigationProp;
}

const StartingScreen: React.FC<StartingScreenProps> = ({ navigation }) => {
    const [playerOneName, setPlayerOneName] = useState('Player 1');
    const [playerTwoName, setPlayerTwoName] = useState('Player 2');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Nimky</Text>
        <Text style={styles.subTitle}>Remember your people</Text>
        <TextInput
            style={styles.input}
            placeholder='Player 1 Name'
            onChangeText={setPlayerOneName}
            value={playerOneName}
        />
        <TextInput
            style={styles.input}
            placeholder='Player 2 Name'
            onChangeText={setPlayerTwoName}
            value={playerTwoName}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game', {
        playerOneName,
        playerTwoName
      })}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20, // Adjust based on your screen's design
    paddingBottom: 50, // Gives some space at the bottom for the button
  },
  content: {
    alignItems: 'center', // Centers the titles vertically
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Gives some space between the main title and subtitle
  },
  subTitle: {
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Match the button width for consistency
    borderRadius: 5, // Optional: round corners
  },
  button: {
    width: '80%', // Adjust based on your design
    backgroundColor: '#007bff', // Example button color
    padding: 15, // Adjust padding for button size
    borderRadius: 5, // Rounds the corners of the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartingScreen;
